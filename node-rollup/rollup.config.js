// Rollup does NOT auto-load .env — load it before the config reads credentials.
import "dotenv/config";
import typescript from "@rollup/plugin-typescript";
import posthog from "@posthog/rollup-plugin";

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
      // No cliBinaryPath: the plugin finds node_modules/.bin/posthog-cli, which is the
      // published @posthog/cli this app depends on directly (see package.json — the direct
      // dependency is what keeps the plugin's own older pin from winning the lookup).
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
