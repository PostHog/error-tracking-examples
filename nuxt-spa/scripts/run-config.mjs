// The identity of one run, read from the environment by nuxt.config.ts and by every script.
//
//   POSTHOG_NUXT_VARIANT         released (default) | pr4779   which build of @posthog/nuxt runs
//   POSTHOG_DELETE_AFTER_UPLOAD  true (default) | false        the module's sourcemaps.deleteAfterUpload
//
// Each of the four runs gets its own output directory and port. PostHog caches a resolved frame
// by function name, file path, line and column - not by chunk id - so two runs whose bundles sit
// at the same paths and URLs share cached frames, and the second run only replays what the first
// one resolved. Separate paths keep each run's symbolication independent.
const VARIANTS = ['released', 'pr4779']
const PORTS = { released: 3221, pr4779: 3222, 'released-keep': 3223, 'pr4779-keep': 3224 }

export const variant = process.env.POSTHOG_NUXT_VARIANT ?? 'released'
if (!VARIANTS.includes(variant)) {
  throw new Error(`POSTHOG_NUXT_VARIANT must be one of ${VARIANTS.join(', ')}, got '${variant}'`)
}
export const keepMaps = process.env.POSTHOG_DELETE_AFTER_UPLOAD === 'false'
export const run = keepMaps ? `${variant}-keep` : variant
export const outputDir = `.output/${run}`
export const port = PORTS[run]
export const posthogModule = variant === 'pr4779' ? '@posthog/nuxt-pr4779' : '@posthog/nuxt'
export const releaseName = `nuxt-spa-${variant}`
