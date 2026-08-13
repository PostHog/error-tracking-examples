# node-rollup

Minimal Node.js + Rollup app instrumented with PostHog error tracking and source map upload.

On run it throws through a 3-deep call chain (`one -> two -> threeRenamed`) and captures the exception,
so the minified stack only resolves back to `src/*.ts` if the uploaded map is found via the chunk id.

Two build paths share the app:

| Command | What it exercises |
| --- | --- |
| `pnpm start` | The normal flow — the plugin generates chunk ids and the uploaded symbol sets are bound to a release. |
| `pnpm start:releaseless` | The experimental flow — `--release-mode=event`, described below. |

## How it works

- **Runtime** (`src/index.ts`): `posthog-node` sends events using the public project key (`POSTHOG_KEY`).
- **Build** (`rollup.config.js`): `@posthog/rollup-plugin` injects chunk IDs into the bundle and uploads
  the source maps using the personal API key (`POSTHOG_API_KEY`). Rollup does not auto-load `.env`, so
  `import 'dotenv/config'` runs first.

### What `start:releaseless` adds

`POSTHOG_RELEASE_MODE=event` flips `sourcemaps.noReleaseBind` on, and then:

- The plugin sets rollup's `output.sourcemapDebugIds` (rollup >= 4.28), so rollup itself stamps an
  ECMA-426 debug id: a `//# debugId=<uuid>` comment in `dist/index.js` and a `debugId` field in
  `dist/index.js.map`. The id is a content hash - rebuilds of identical code keep the same id.
- The plugin passes `--release-mode=event` to `posthog-cli sourcemap process`, which adopts that debug id as
  the chunk id (instead of generating a random one), injects `_posthogChunkIds` + `_posthogReleaseId`
  snippets, and uploads the map without binding the symbol set to a release.

## Local bits this depends on

The CLI is the released `@posthog/cli` (a devDependency here — it has to be a direct one, because the
plugin's own pinned `@posthog/cli` is older and would otherwise win the binary lookup). The plugin is
still a local build, because the plugin change hasn't shipped.

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

## Run

```bash
cp .env.example .env   # then edit if you're not on the local-dev defaults
pnpm install
pnpm start             # clean + build (uploads source maps) + run (captures the exception)
pnpm start:releaseless  # same, on the --release-mode=event path
```

## What to check after a releaseless build

```bash
tail -c 200 dist/index.js          # //# debugId=<uuid> emitted by rollup
grep -o '"debugId":"[^"]*"' dist/index.js.map
grep -o '_posthogChunkIds\[n\]="[^"]*"' dist/index.js   # must equal the debugId
pnpm build:releaseless && tail -c 200 dist/index.js     # rebuild: id unchanged
```

## Credentials

Two different keys, two different jobs (see `.env.example`):

- `POSTHOG_KEY` — public **project** key, used by the SDK at runtime.
- `POSTHOG_API_KEY` — **personal** API key with error-tracking write scope, used to upload source maps
  at build time.

The defaults in `.env.example` target a local PostHog instance (`http://localhost:8010`). The personal
key is the deterministic local-dev key; the project key is per-database (the file explains how to fetch
the current one).
