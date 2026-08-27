# web-angular-sw

Angular 22 app with `@angular/service-worker`, reproducing
[PostHog/posthog#86046](https://github.com/PostHog/posthog/issues/86046): running
`posthog-cli sourcemap inject` after `ng build` leaves the app permanently stuck on its cached
version — and verifying the fix, regenerating `ngsw.json` with Angular's own `ngsw-config`.

## The bug

- `ng build` (with `serviceWorker` enabled) writes a SHA-1 of every bundle into
  `dist/web-angular-sw/browser/ngsw.json` as its final step.
- `posthog-cli sourcemap inject` then rewrites `main-*.js` in place: it prepends the
  `_posthogChunkIds` IIFE and appends the `//# chunkId=` comment.
- At update time the service worker fetches each asset and checks it against `ngsw.json`. One
  mismatch and it marks the whole version invalid and keeps serving the previous cached version —
  users never get the new deploy, and nothing errors.

There is no hook inside a stock `ng build` to inject earlier, so any post-build mutation
invalidates the manifest by construction.

## The fix

Regenerate the manifest after the last command that touches the build output, with the
`ngsw-config` bin that ships with `@angular/service-worker`:

```bash
ng build --configuration production
posthog-cli sourcemap inject --directory ./dist/web-angular-sw/browser
posthog-cli sourcemap upload --directory ./dist/web-angular-sw/browser
ngsw-config ./dist/web-angular-sw/browser ./ngsw-config.json /
```

(`upload --delete-after` also rewrites the bundles when it strips `sourceMappingURL` comments,
so `ngsw-config` must come after it too.) This is what the PostHog Angular docs now recommend,
and what Sentry documents for the same problem with `sentry-cli`.

## Run

`pnpm start` — clean, build, inject, upload, then:

1. `verify:broken` — recomputes the SHA-1 of every `ngsw.json` entry. Expects the `main-*.js`
   MISMATCH; fails if injection stopped changing the file.
2. `regen` — `ngsw-config` rewrites `ngsw.json` from the injected files.
3. `verify:fixed` — expects every entry to MATCH.
4. `serve` — http://localhost:8082. Click **Capture exception** to send a handled exception; the
   page also shows the service worker's last version event.

`pnpm start:offline` is the same without the upload, for when the local PostHog isn't running.
Both need the repo's root `.env` synced by `bin/copy-env` (the `env-setup` proc does that).

The regenerated manifest also lists `ngsw-worker.js`, `safety-worker.js` and
`worker-basic.min.js`, which `ng build` leaves out of its own `hashTable`. That's a known quirk
of the standalone CLI walking the whole output directory; the service worker handles it fine.

## Browser proof

`pnpm test:browser` runs the actual failure in headless Chrome (the installed Google Chrome,
via `playwright-core`'s `chrome` channel — nothing to download):

1. Build **v1**, inject, regenerate, serve. Load until the service worker controls the page.
2. Build **v2**, inject, **don't** regenerate. Ask the service worker for an update: expect
   `VERSION_INSTALLATION_FAILED`. Then terminate the worker (CDP `ServiceWorker.stopAllWorkers`,
   standing in for the idle timeout) and reload: the restarted worker serves `v1` from cache.
3. Regenerate v2's manifest, check again: expect `VERSION_READY`, and a reload shows `v2`.

Why the restart in step 2: a failed update puts the worker in `EXISTING_CLIENTS_ONLY`, an
in-memory state in which brand-new navigations fall through to the network — so a reload
*immediately* after the failure would actually show v2. Browsers kill idle workers within
seconds, though, and the restarted worker re-initializes from its persisted `latest` entry, which
is still v1 (v2 was never committed), and serves that from cache to every new client. That is what
real users hit on their next visit, and why the reporter's app sat on a stale version for weeks
while deploys kept succeeding.

Every build gets a fresh id stamped into `src/build.ts` (gitignored, written by
`bin/stamp-build.mjs`) so the manifest actually changes between builds.

## Credentials

Root `.env` via `bin/copy-env`: `POSTHOG_CLI_HOST` / `POSTHOG_CLI_ENV_ID` / `POSTHOG_CLI_TOKEN`
for posthog-cli. The runtime `posthog-js` init is hardcoded to the local-dev project token,
same as `web-raw`.
