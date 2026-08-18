// Rollup does NOT auto-load .env — load it before the config reads credentials.
import "dotenv/config";
import typescript from "@rollup/plugin-typescript";
import posthog from "@posthog/rollup-plugin";

// Event mode needs `posthog-cli release resolve`, which the published @posthog/cli doesn't have
// yet, so point the plugin at the local build from the posthog monorepo.
const localCli = "../../posthog/cli/target/debug/posthog-cli";

export default {
  input: "src/index.ts",
  output: {
    dir: "dist",
    format: "es",
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
      cliBinaryPath: localCli,
      sourcemaps: {
        enabled: true,
        releaseName: "node-rollup-error-tracking-example",
        // Overridable so a second release of identical code is one command away, which is what
        // event mode has to survive: same chunk id, new release id, re-upload of changed bytes.
        // Keep .map files on disk so the injected chunk id stays inspectable.
        deleteAfterUpload: false,
        // Defaults to POSTHOG_RELEASE_MODE, which `pnpm build:releaseless` sets to `event`.
      },
    }),
  ],
};
