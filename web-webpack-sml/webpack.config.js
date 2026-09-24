const path = require('path');

module.exports = {
  mode: 'production',
  devtool: 'source-map',
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    clean: true,
  },
  module: {
    rules: [
      // The create-react-app setup: run source-map-loader over everything, node_modules
      // included, so dependencies' published source maps flow into the app's own maps.
      // This rule is what surfaces the warnings — posthog-js 1.421.1+ ships maps whose
      // sources point at src/*.ts files that are not in the package and carries no
      // sourcesContent to fall back on, so the loader warns once per unresolvable file.
      {
        enforce: 'pre',
        test: /\.(js|mjs|jsx|ts|tsx|css)$/,
        loader: 'source-map-loader',
      },
    ],
  },
  resolve: {
    // `pnpm build:before` points this at a second install of posthog-js@1.421.0 (the
    // last release whose maps still carry sourcesContent) to show the same build clean.
    alias: process.env.POSTHOG_JS_DIR
      ? { 'posthog-js': path.resolve(__dirname, process.env.POSTHOG_JS_DIR) }
      : {},
  },
};
