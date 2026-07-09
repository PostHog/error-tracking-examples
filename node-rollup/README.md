# node-rollup

Minimal Node.js + Rollup app instrumented with PostHog error tracking and source map upload.

On run it captures **5 distinct exceptions** (a `TypeError`, `RangeError`, `SyntaxError`, a custom
`PaymentDeclinedError`, and an async rejection), each thrown from its own nested call chain so every
captured issue has a different multi-frame stack. Because the app runs the Rollup-built bundle, those
stacks only resolve back to `src/index.ts` if source maps were uploaded — which the build does.

## How it works

- **Runtime** (`src/index.ts`): `posthog-node` sends events using the public project key (`POSTHOG_KEY`).
- **Build** (`rollup.config.js`): `@posthog/rollup-plugin` injects chunk IDs into the bundle and uploads
  the source maps using the personal API key (`POSTHOG_API_KEY`). Rollup does not auto-load `.env`, so
  `import 'dotenv/config'` runs first.

## Run

```bash
cp .env.example .env   # then edit if you're not on the local-dev defaults
npm install
npm run throw          # build (uploads source maps) + run (sends 5 exceptions)
```

`npm run build` and `npm run start` are also available separately.

## Credentials

Two different keys, two different jobs (see `.env.example`):

- `POSTHOG_KEY` — public **project** key, used by the SDK at runtime.
- `POSTHOG_API_KEY` — **personal** API key with error-tracking write scope, used to upload source maps
  at build time.

The defaults in `.env.example` target a local PostHog instance (`http://localhost:8010`). The personal
key is the deterministic local-dev key; the project key is per-database (the file explains how to fetch
the current one).
