# next-webpack

Minimal Next.js (app router) app instrumented with `@posthog/nextjs-config`, exercising the
webpack build path: `withPostHogConfig` injects the PostHog webpack plugin into the client and
server compilations, and each compilation's `done` hook runs `posthog-cli sourcemap process`.

On `pnpm start` / `pnpm start:releaseless` it builds, then probes `GET /api/boom`, which throws
through a 3-deep chain (`one -> two -> threeRenamed`) and captures the exception server-side with
`posthog-node` - so the whole flow is headless: build, upload, capture, symbolicate.

| Command | What it exercises |
| --- | --- |
| `pnpm start` | Legacy flow - random per-build chunk ids, symbol sets bound to the release. |
| `pnpm start:releaseless` | `--release-mode=event` - content-addressed chunk ids, release id injected into every chunk, symbol sets unbound. |

## What the releaseless build shows

- Client and server chunks carry `//# chunkId=` with UUIDv5 (content-addressed) ids plus the
  `_posthogChunkIds` and `_posthogReleaseId` snippets, injected on disk by the CLI.
- A rebuild of unchanged code reports `N skipped (N already present)` for every chunk - the
  event-mode dedupe property.
- The captured `$exception` carries `$release_id`, and its frames resolve back to
  `./app/api/boom/route.js` and `./lib/*.js`.

> Native webpack debug ids are never enabled on Next.js: the vendored webpack reports no
> `compiler.webpack.version`, so the plugin's support gate declines and the CLI derives
> content-addressed ids instead. Equally stable, just not shared with other tooling.

## Local bits this depends on

- **posthog-cli** from `../../posthog/cli/target/debug/posthog-cli`
  ([posthog PR #85307](https://github.com/PostHog/posthog/pull/85307)).
- `vendor/*.tgz` - `@posthog/nextjs-config`, `@posthog/webpack-plugin`, and `@posthog/plugin-utils`
  packed from the `ab/feat/webpack-event-release-mode` branch of
  [posthog-js PR #4563](https://github.com/PostHog/posthog-js/pull/4563), plus the SDK tarballs
  shared with the other node examples. `package.json` consumes them via `file:` and pnpm overrides.

## Credentials

`bin/copy-env` syncs the repo root `.env` into this folder. Next.js loads it itself, so the config
reads `POSTHOG_API_KEY` / `POSTHOG_PROJECT_ID` / `POSTHOG_HOST` at build time and the probe passes
`POSTHOG_KEY` / `POSTHOG_HOST` to the server at runtime.

## Not covered here

The turbopack path (`next build --turbopack` + the `runAfterProductionCompile` hook) runs the same
CLI `process` over the dist directory but is a separate build pipeline - add a
`next-turbopack`-style proc if it needs its own coverage.
