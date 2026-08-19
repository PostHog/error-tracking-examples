// Webpack does NOT auto-load .env — load it before the config reads credentials.
require('dotenv').config();
const path = require('path');
const { PosthogWebpackPlugin } = require('@posthog/webpack-plugin');

// Event mode needs `posthog-cli release resolve` and debug id adoption, which the published
// @posthog/cli doesn't have yet, so point the plugin at the local build from the posthog monorepo.
const localCli = path.resolve(__dirname, '../../posthog/cli/target/debug/posthog-cli');

module.exports = {
  mode: 'production',
  target: 'node',
  // The PostHog plugin applies its own SourceMapDevToolPlugin (with debugIds in event mode),
  // so webpack's shorthand devtool must stay off or the maps get generated twice.
  devtool: false,
  entry: './src/index.ts',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.js',
    clean: true,
  },
  resolve: { extensions: ['.ts', '.js'] },
  module: {
    rules: [{ test: /\.ts$/, use: 'ts-loader', exclude: /node_modules/ }],
  },
  // Keep the SDK out of the bundle so the captured stack frames stay in app code,
  // matching how node-rollup leaves posthog-node external.
  externals: { 'posthog-node': 'commonjs posthog-node' },
  plugins: [
    // Runs posthog-cli `sourcemap process` after the build: it injects chunk ids into the
    // emitted files on disk and uploads the maps so minified stack traces resolve back to src/*.ts.
    new PosthogWebpackPlugin({
      personalApiKey: process.env.POSTHOG_API_KEY,
      projectId: process.env.POSTHOG_PROJECT_ID,
      host: process.env.POSTHOG_HOST,
      cliBinaryPath: localCli,
      sourcemaps: {
        enabled: true,
        releaseName: 'node-webpack-error-tracking-example',
        // Keep .map files on disk so the injected chunk id stays inspectable.
        deleteAfterUpload: false,
        // Defaults to POSTHOG_RELEASE_MODE, which `pnpm build:releaseless` sets to `event`.
      },
    }),
  ],
};
