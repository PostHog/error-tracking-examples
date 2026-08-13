# web-vite-sri3

Vite + React app reproducing a customer-reported incompatibility between
`@posthog/rollup-plugin` and `vite-plugin-sri3`. Both plugins are the published npm builds —
no vendored/local bits, unlike the other examples — and the build fails its SRI check every
time by design: this example exists to demonstrate the breakage, not a working flow.

## The incompatibility

- `vite-plugin-sri3` computes Subresource Integrity hashes in **`generateBundle`**, from the
  in-memory chunk code, and stamps them onto the script/link tags in `dist/index.html`.
- `@posthog/rollup-plugin` runs in **`writeBundle`** — after the files are on disk — and mutates
  the emitted `.js` files (posthog-cli injects `_posthogChunkIds` snippets before uploading the
  source maps).

`generateBundle` always completes before `writeBundle` starts, so plugin ordering cannot fix
this: the served files never match the hashes, and the browser blocks every script with

```
Failed to find a valid digest in the 'integrity' attribute for resource '…/assets/index-*.js'
```

The page stays blank.

## Run

`pnpm start` — clean + build + verify + serve. `verify-sri.mjs` prints the hash mismatches,
then `vite preview` serves the broken site on http://localhost:8081 (blank page, SRI errors in
the console).

`pnpm verify` re-runs the hash check on its own: it recomputes each asset's hash and compares
it against the `integrity` attribute in `dist/index.html`. Expect `MISMATCH` — a `MATCH` would
mean the incompatibility has been fixed.

## Credentials

Uses the root `.env` synced by `bin/copy-env` (run automatically by the `env-setup` proc):
`POSTHOG_API_KEY` / `POSTHOG_PROJECT_ID` / `POSTHOG_HOST` for the plugin's source map upload at
build time. The runtime `posthog-js` init is hardcoded to the local-dev project token, same as
web-raw — though in this example the scripts never run, so nothing is captured.
