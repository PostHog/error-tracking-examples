// Rollup does NOT auto-load .env — load it before the config reads credentials.
import 'dotenv/config'
import typescript from '@rollup/plugin-typescript'
import posthog from '@posthog/rollup-plugin'

// Locally-built CLI that understands --no-release-bind (branch ab/feat/cli-release-injection).
const LOCAL_CLI = '/Users/ablaszkiewicz/Documents/repos/posthog/cli/target/debug/posthog-cli'

export default {
  input: 'src/index.ts',
  output: {
    dir: 'dist',
    format: 'es',
    sourcemap: true,
  },
  plugins: [
    typescript(),
    posthog({
      personalApiKey: process.env.POSTHOG_API_KEY,
      projectId: process.env.POSTHOG_PROJECT_ID,
      host: process.env.POSTHOG_HOST,
      cliBinaryPath: LOCAL_CLI,
      sourcemaps: {
        enabled: true,
        releaseName: 'node-rollup-releaseless-example',
        releaseVersion: '1.0.0',
        // Keep .map files on disk so the rollup-emitted debugId stays inspectable.
        deleteAfterUpload: false,
        // Rollup emits ECMA-426 debug ids (rollup >= 4.28); the CLI adopts them
        // as chunk ids instead of generating its own, and injects the release id
        // into the bundle rather than binding it to the uploaded symbol sets.
        noReleaseBind: true,
      },
    }),
  ],
}
