// Rollup does NOT auto-load .env — load it before the config reads credentials.
import 'dotenv/config'
import typescript from '@rollup/plugin-typescript'
import posthog from '@posthog/rollup-plugin'

export default {
  input: 'src/index.ts',
  output: {
    dir: 'dist',
    format: 'es',
    sourcemap: true,
  },
  plugins: [
    typescript(),
    // Injects chunk IDs into the built bundle + maps, then uploads the maps to
    // PostHog so minified stack traces resolve back to src/index.ts.
    posthog({
      personalApiKey: process.env.POSTHOG_API_KEY,
      projectId: process.env.POSTHOG_PROJECT_ID,
      host: process.env.POSTHOG_HOST,
      sourcemaps: {
        enabled: true,
        releaseName: 'node-rollup-error-tracking-example',
        releaseVersion: '1.0.0',
        // Don't leave .map files next to the shipped bundle — they live in PostHog.
        deleteAfterUpload: true,
      },
    }),
  ],
}
