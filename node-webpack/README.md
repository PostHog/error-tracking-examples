# node-webpack

Minimal Node.js + webpack app instrumented with PostHog error tracking and source map upload.

On run it throws through a 3-deep call chain (`one -> two -> threeRenamed`) and captures the exception,
so the minified stack only resolves back to `src/*.ts` if the uploaded map is found via the chunk id.

Two build paths share the app:

| Command | What it exercises |
| --- | --- |
| `pnpm start` | The normal flow — posthog-cli `sourcemap process` generates random chunk ids and the uploaded symbol sets are bound to a release. |
| `pnpm start:releaseless` | The experimental flow — `--release-mode=event`, described below. |

## How it works

- **Runtime** (`src/index.ts`): `posthog-node` sends events using the public project key (`POSTHOG_KEY`).
- **Build** (`webpack.config.js`): `@posthog/webpack-plugin` applies webpack's `SourceMapDevToolPlugin`
  to emit the maps, then runs `posthog-cli sourcemap process` after the build. The CLI injects chunk
  ids into the emitted files on disk and uploads the maps using the personal API key
  (`POSTHOG_API_KEY`). Webpack does not auto-load `.env`, so `require('dotenv').config()` runs first.

### What `start:releaseless` adds

`POSTHOG_RELEASE_MODE=event` flips the plugin (and the spawned CLI) onto event release mode:

- The plugin sets `debugIds: true` on the `SourceMapDevToolPlugin` (webpack >= 5.104), so webpack
  itself stamps an ECMA-426 debug id: a `//# debugId=<uuid>` comment in `dist/index.js` and a
  `debugId` field in `dist/index.js.map`. The id is content-derived — rebuilds of identical code keep
  the same id.
- The CLI resolves the release once and adopts webpack's debug id as the chunk id (instead of deriving
  its own), injects the `_posthogChunkIds` + `_posthogReleaseId` snippet, and uploads the map without
  binding the symbol set to a release. Each exception then reports its own `$release_id`.

## Local bits this depends on

Everything unreleased comes from local builds:

- **posthog-cli** from `../../posthog/cli/target/debug/posthog-cli` (`cargo build` on the
  `ab/feat/cli-event-mode-debug-ids` branch of the posthog monorepo — event mode plus debug id
  adoption, [posthog PR #85307](https://github.com/PostHog/posthog/pull/85307)).
- `vendor/posthog-plugin-utils.tgz` + `vendor/posthog-webpack-plugin.tgz` — packed from the
  `ab/feat/webpack-event-release-mode` branch of
  [posthog-js PR #4563](https://github.com/PostHog/posthog-js/pull/4563).
- `vendor/posthog-core.tgz` + `vendor/posthog-node.tgz` — the SDK build that reads
  `_posthogReleaseId` and attaches `$release_id` to exceptions (same tarballs as node-rollup).

`package.json` consumes the plugin via `file:`, and pnpm overrides force its `@posthog/plugin-utils`
and `@posthog/core` dependencies onto the local tarballs too. To refresh after changing the branch:

```bash
cd ~/Documents/repos/posthog-js
git checkout ab/feat/webpack-event-release-mode
cd packages/plugin-utils   && ./node_modules/.bin/rslib build && pnpm pack --out <this-app>/vendor/posthog-plugin-utils.tgz
cd ../webpack-plugin       && ./node_modules/.bin/rslib build && pnpm pack --out <this-app>/vendor/posthog-webpack-plugin.tgz
cd <this-app> && rm -rf node_modules && pnpm install
```

## Run

```bash
cp .env.example .env    # then edit if you're not on the local-dev defaults
pnpm install
pnpm start              # clean + build (uploads source maps) + run (captures the exception)
pnpm start:releaseless  # same, on the --release-mode=event path
```

## What to check after a releaseless build

```bash
grep -o '//# debugId=[a-f0-9-]*' dist/index.js          # stamped by webpack at compile time
grep -o '"debugId":"[^"]*"' dist/index.js.map
grep -o '_posthogChunkIds\[n\]="[^"]*"' dist/index.js    # must equal the debugId
grep -o '//# chunkId=[a-f0-9-]*' dist/index.js           # must equal the debugId
grep -o '_posthogReleaseId||"[^"]*"' dist/index.js       # the resolved release id
pnpm build:releaseless && grep -o '//# debugId=[a-f0-9-]*' dist/index.js   # rebuild: id unchanged
```

## Credentials

Two different keys, two different jobs (see `.env.example`):

- `POSTHOG_KEY` — public **project** key, used by the SDK at runtime.
- `POSTHOG_API_KEY` — **personal** API key with error-tracking write scope, used to upload source maps
  at build time.

The defaults in `.env.example` target a local PostHog instance (`http://localhost:8010`). The personal
key is the deterministic local-dev key; the project key is per-database (the file explains how to fetch
the current one).
