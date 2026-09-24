# nuxt-spa

Client-only Nuxt 4 app (`ssr: false`) instrumented with `@posthog/nuxt`, reproducing
[PostHog/posthog-js#4779](https://github.com/PostHog/posthog-js/pull/4779).

Nitro writes a server bundle for a `ssr: false` build too: it serves the SPA shell and the API
routes. The published module decides the server inject from `nuxt.options.ssr`, so it skips that
bundle, and then uploads the whole output directory. The CLI refuses the first server chunk that
carries no chunk id, the module catches the error, and the build stays green:

```
Oops! While preparing files for upload
    0: Chunk ID not found in .../.output/released/server/chunks/_/error-500.mjs. Run 'sourcemap inject' before 'sourcemap upload' ...
 ERROR  Failed to process or upload sourcemaps: Command failed with code 1
└  ✨ Build complete!
```

So the server sourcemaps never reach PostHog, and a server exception keeps its bundle paths
(`.output/released/server/chunks/routes/api/boom.mjs:14`) instead of `server/lib/chain.ts`. The
same upload carries no release flags, so the CLI resolves a release derived from the git checkout
(`error-tracking-examples@<commit sha>`) next to the configured one.

## Runs

| Command | Module | `deleteAfterUpload` | Server exception | Client exception |
| --- | --- | --- | --- | --- |
| `pnpm start` | published 1.7.87 | true | not symbolicated | symbolicated |
| `pnpm start:keep` | published 1.7.87 | false | not symbolicated | not symbolicated |
| `pnpm start:fixed` | PR 4779 branch | true | symbolicated | symbolicated |
| `pnpm start:fixed:keep` | PR 4779 branch | false | symbolicated | symbolicated |

`start:keep` is the second defect the PR fixes: with `deleteAfterUpload: false` the published
module uploads nothing in the public-assets hook, so its one failing output upload takes the
client sourcemaps down as well.

Every run is `clean`, `build`, `probe`, `check`, driven by two environment variables that
`scripts/run-config.mjs` turns into a run identity (see below):

- `build` runs `nuxt build` and mirrors its output into `build.log`.
- `probe` starts the built server, fetches `GET /api/boom?marker=<uuid>` (throws through
  `server/lib/chain.ts`, captured by the module's Nitro plugin with posthog-node), then opens the
  page in the installed Google Chrome through playwright-core and clicks the button (throws
  through `app/lib/chain.ts`, captured by the module's Vue plugin with posthog-js). The app
  server is stopped before the click; see below for why.
- `check` polls PostHog until both events are ingested, prints the release each resolved to and
  its in-app frames, quotes the release lines and CLI errors from `build.log`, and lists the
  releases created and symbol sets uploaded by the build. It exits 0 when the run shows what its
  row in the table says.

## Local bits this depends on

- `vendor/posthog-nuxt.tgz` is `@posthog/nuxt` packed from the PR head
  (`3ab5a3191`, "fix(nuxt): upload public source maps in the public-assets hook in both deletion
  modes"). It is installed under the alias `@posthog/nuxt-pr4779` next to the published 1.7.87,
  so both builds of the module sit in one `node_modules` and share the same posthog-js,
  posthog-node and CLI. To refresh it:

  ```bash
  cd path/to/posthog-js && git fetch origin pull/4779/head && git worktree add /tmp/pr4779 FETCH_HEAD
  cd /tmp/pr4779 && pnpm install --frozen-lockfile && pnpm turbo build --filter=@posthog/nuxt...
  cd packages/nuxt && pnpm pack --out path/to/error-tracking-examples/nuxt-spa/vendor/posthog-nuxt.tgz
  ```

- The CLI is the published `@posthog/cli` (a direct devDependency), passed to both variants as
  `cliBinaryPath`, so the comparison never depends on which copy the module finds next to itself.
- Google Chrome, driven headless by `playwright-core`, for the client exception.

## Why the client exception is sent after the app server is stopped

The client frames carry the URL the browser loaded the chunk from. When PostHog has no symbol set
for a frame's chunk id, it fetches the chunk from that URL and follows its `//# sourceMappingURL=`
comment. In the keep-maps runs the sourcemaps stay on disk and the built server serves them, so a
server that is still up lets PostHog fetch them itself: the client frames then resolve, with no
release, and the run no longer shows whether the module uploaded anything. A production server
PostHog can reach behaves the same way. The probe therefore loads the page, stops the app server,
and clicks the button only then. posthog-js talks to PostHog, not to the app, so the exception
still goes out, but only an uploaded symbol set can resolve it.

## Why each run has its own output directory and port

PostHog caches a resolved frame by function name, file path, line and column, not by chunk id
(cymbal's `frame_id`; `frame_resolved_ttl_seconds`, 30 minutes by default). A frame first seen
without a chunk id is stored as a resolved passthrough, and a later event with the same location
reuses that entry even after the symbol set arrives. Two runs whose bundles sit at the same paths
and URLs would therefore share frames, and the second run would only replay the first run's
result. So each run builds into `.output/<run>` and listens on its own port
(`released` 3221, `pr4779` 3222, `released-keep` 3223, `pr4779-keep` 3224).

The same cache applies to a real upgrade: a server frame that PostHog saw before the fix keeps its
bundle path for up to 30 minutes after the first build with the fixed module.

## Credentials

`bin/copy-env` syncs the repo root `.env` into this folder. `nuxt build` loads it itself, so
`nuxt.config.ts` reads `POSTHOG_KEY`, `POSTHOG_HOST`, `POSTHOG_CLI_TOKEN` and `POSTHOG_CLI_ENV_ID`
at build time; the public key and host are baked into the runtime config, so the built server needs
no environment. `scripts/check.mjs` reads the same `.env` for the personal API key (release and
symbol set lists) and logs in as the seeded dev user for the query endpoint.

## Two things that bite

- posthog-js drops every event from an automated browser (`navigator.webdriver` is set) unless
  `opt_out_useragent_filter` is on. The client config turns it on, or the probe waits forever for
  an exception that was never sent.
- The local PostHog redirects `/static/<version>/exception-autocapture.js` to `/login`, which the
  browser reports as a CORS error in the console. posthog-js falls back to the unversioned URL and
  carries on.
