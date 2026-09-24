# web-webpack-sml

Reproduces [PostHog/posthog-js#4724](https://github.com/PostHog/posthog-js/issues/4724): a
webpack 5 build with `source-map-loader` prints one warning per unresolvable entry in the source
maps posthog-js ships, 126 of them at the pinned 1.423.2.

```bash
pnpm install
pnpm build          # posthog-js 1.423.2 — 126 "Failed to parse source map" warnings
pnpm build:before   # same build, aliased to posthog-js 1.421.0 — zero
```

Nothing runs and nothing talks to PostHog — the reproduction is entirely at build time, so the
example needs no credentials.

## The mechanism

The webpack config runs `source-map-loader` over every module, `node_modules` included, with
`enforce: 'pre'` — the create-react-app setup, which is how dependencies' published source maps
flow into the app's own maps. For every path in a map's `sources`, the loader takes the original
text from `sourcesContent` when the map carries it, and otherwise reads the path from disk.

posthog-js 1.421.1 ([PostHog/posthog-js#4520](https://github.com/PostHog/posthog-js/pull/4520))
stripped `sourcesContent` from the shipped maps, and the `sources` paths point at files the
published package does not contain, so every one of them falls through to a failed disk read.
The unresolvable paths come in three groups:

- `../src/**/*.ts` — the SDK's own TypeScript, never published,
- `node_modules/browser-common/dist/*.mjs` — an internal workspace package inlined at build time,
- one pnpm-store path from PostHog's build machine
  (`setup-pnpm/node_modules/.bin/store/.../fflate/esm/browser.js`).

1.421.0 is the last release whose maps carry `sourcesContent` — found by bisecting the published
versions, which is why `vendor-before/` pins it rather than the issue's 1.418.10. The loader never
needs the files on disk there, so the identical build is clean.

## What lands in the consumer's map

The same pair of builds also shows the issue's other two claims, in `dist/bundle.js.map`:

- **before (1.421.0)**: all 124 sources carry `sourcesContent` — 1.2 MB of posthog-js TypeScript
  embedded in the app's own map (the issue's claim that the removed content *did* reach bundler
  output, contradicting #4520's "they don't reach anyone's bundle output").
- **after (1.423.2)**: 1 of 127 sources carries content (the app's own `index.js`), and 62 of the
  dangling paths normalize to `webpack://web-webpack-sml/../src/*.ts` — posthog-js's unresolved
  `src/` colliding with the consumer's own `src/` namespace.

The warnings are warnings, not errors: the build still succeeds. A consumer can hide them with
webpack's `ignoreWarnings: [/Failed to parse source map/]`, which is the standard workaround and
also exactly the console spam the issue complains about.
