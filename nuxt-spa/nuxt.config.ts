import { fileURLToPath } from 'node:url'
import { keepMaps, outputDir, posthogModule, releaseName, run, variant } from './scripts/run-config.mjs'

// `released` (the default) is the published @posthog/nuxt pinned in package.json and reproduces
// PostHog/posthog-js#4779. `pr4779` is that PR's branch, packed into vendor/posthog-nuxt.tgz and
// installed under the alias @posthog/nuxt-pr4779, so both sit in one node_modules and share every
// other dependency. See scripts/run-config.mjs for the environment variables that pick a run.
export default defineNuxtConfig({
  // The case the PR is about: a client-only app. Nitro still builds a server bundle for the
  // API routes, and that bundle is what the published module never injects.
  ssr: false,
  modules: [posthogModule],
  nitro: {
    // One output directory per run, so runs do not share frame cache entries (run-config.mjs).
    output: { dir: outputDir },
  },
  runtimeConfig: {
    public: {
      nuxtSpa: { variant, run, module: posthogModule },
    },
  },
  posthogConfig: {
    publicKey: process.env.POSTHOG_KEY,
    host: process.env.POSTHOG_HOST,
    // The published @posthog/cli this app depends on directly, so both variants run the same
    // CLI instead of whichever copy the module finds next to itself.
    cliBinaryPath: fileURLToPath(new URL('./node_modules/.bin/posthog-cli', import.meta.url)),
    clientConfig: {
      // The module's Vue plugin only hooks `vue:error` when this is on.
      capture_exceptions: true,
      // Plain JSON bodies, so the probe can read the marker out of the request it waits for.
      disable_compression: true,
      // The probe drives the page through an automated browser (navigator.webdriver is set),
      // which posthog-js otherwise treats as a bot and captures nothing for.
      opt_out_useragent_filter: true,
    },
    serverConfig: {
      // The module's Nitro plugin only hooks Nitro's `error` hook when this is on.
      enableExceptionAutocapture: true,
    },
    sourcemaps: {
      enabled: true,
      personalApiKey: process.env.POSTHOG_CLI_TOKEN,
      projectId: process.env.POSTHOG_CLI_ENV_ID,
      releaseName,
      releaseVersion: process.env.APP_VERSION ?? '1.0.0',
      logLevel: 'info',
      // Default true. `false` is the other mode the PR touches: there the published module
      // uploads nothing early, so its one failing upload also drops the client sourcemaps.
      deleteAfterUpload: !keepMaps,
    },
  },
})
