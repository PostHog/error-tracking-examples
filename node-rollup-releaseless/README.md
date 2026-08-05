# node-rollup-releaseless

`node-rollup` wired to a **locally-built** `@posthog/rollup-plugin` and `posthog-cli`, for developing
the debug-id (releaseless) error-tracking flow before it ships.

What the build exercises:

- `sourcemaps.noReleaseBind: true` makes the plugin set rollup's `output.sourcemapDebugIds` (rollup >= 4.28),
  so rollup itself stamps an ECMA-426 debug id: a `//# debugId=<uuid>` comment in `dist/index.js` and a
  `debugId` field in `dist/index.js.map`. The id is a content hash - rebuilds of identical code keep the same id.
- The plugin passes `--no-release-bind` to `posthog-cli sourcemap process`, which adopts that debug id as the
  chunk id (instead of generating a random one), injects `_posthogChunkIds` + `_posthogReleaseId` snippets,
  and uploads the map without binding the symbol set to a release.
- At runtime the app throws through a 3-deep call chain (`one -> two -> three`) and captures the exception,
  so the minified stack only resolves back to `src/*.ts` if the uploaded map is found via that chunk id.

## Local bits this depends on

- `vendor/posthog-plugin-utils.tgz` + `vendor/posthog-rollup-plugin.tgz` - packed from the
  `ab/feat/rollup-debug-ids` branch of [posthog-js PR #4401](https://github.com/PostHog/posthog-js/pull/4401).
  `package.json` consumes the plugin via `file:`, and a pnpm override forces its `@posthog/plugin-utils`
  dependency onto the local tarball too. To refresh after changing the branch:

  ```bash
  cd ~/Documents/repos/posthog-js
  git worktree add /tmp/pjs-debug-ids origin/ab/feat/rollup-debug-ids
  cd /tmp/pjs-debug-ids
  pnpm install --filter "@posthog/rollup-plugin..."
  pnpm --filter @posthog/plugin-utils build && pnpm --filter @posthog/rollup-plugin build
  cd packages/plugin-utils && pnpm pack --out <this-app>/vendor/posthog-plugin-utils.tgz
  cd ../rollup-plugin   && pnpm pack --out <this-app>/vendor/posthog-rollup-plugin.tgz
  cd <this-app> && rm -rf node_modules && pnpm install
  ```

- `~/Documents/repos/posthog/cli/target/debug/posthog-cli` - a CLI build that understands
  `--no-release-bind` (branch `ab/feat/cli-release-injection`, posthog PR #75562). The path is
  hardcoded in `rollup.config.js` via `cliBinaryPath`, same as the other `*-releaseless` examples.

## Run

```bash
cp .env.example .env   # then edit if you're not on the local-dev defaults
pnpm install
pnpm start             # clean + build (uploads source maps) + run (captures the exception)
```

## What to check after a build

```bash
tail -c 200 dist/index.js          # //# debugId=<uuid> emitted by rollup
grep -o '"debugId":"[^"]*"' dist/index.js.map
grep -o '_posthogChunkIds\[n\]="[^"]*"' dist/index.js   # must equal the debugId
pnpm build && tail -c 200 dist/index.js                 # rebuild: id unchanged
```

## Credentials

Same two keys as `node-rollup` (see `.env.example`): `POSTHOG_KEY` (public project key, runtime) and
`POSTHOG_API_KEY` (personal key, build-time upload). Defaults target a local PostHog on `localhost:8010`.
