// Rollup does NOT auto-load .env — load it before the config reads credentials.
import 'dotenv/config'
import typescript from '@rollup/plugin-typescript'
import posthog from '@posthog/rollup-plugin'

// Locally-built CLI that understands --release-mode=event (branch ab/feat/cli-release-injection).
const LOCAL_CLI = '/Users/ablaszkiewicz/Documents/repos/posthog/cli/target/debug/posthog-cli'

// Set by `pnpm build:releaseless`. On: rollup stamps ECMA-426 debug ids (rollup >= 4.28) that the
// CLI adopts as chunk ids, and the release id is injected into the bundle instead of being bound to
// the uploaded symbol sets. Off: the plugin behaves exactly as the published one does.
// The plugin option is still named noReleaseBind; it maps to the CLI's --release-mode=event.
const eventReleaseMode = process.env.POSTHOG_RELEASE_MODE === 'event'

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
    // PostHog so minified stack traces resolve back to src/*.ts.
    posthog({
      personalApiKey: process.env.POSTHOG_API_KEY,
      projectId: process.env.POSTHOG_PROJECT_ID,
      host: process.env.POSTHOG_HOST,
      cliBinaryPath: LOCAL_CLI,
      sourcemaps: {
        enabled: true,
        releaseName: 'node-rollup-error-tracking-example',
        releaseVersion: '1.0.0',
        // Keep .map files on disk so the rollup-emitted debugId stays inspectable.
        deleteAfterUpload: false,
        noReleaseBind: eventReleaseMode,
      },
    }),
  ],
}
