const path = require('path')
const { withPostHogConfig } = require('@posthog/nextjs-config')

// Event mode needs `posthog-cli release resolve` and debug id adoption, which the published
// @posthog/cli doesn't have yet, so point the plugin at the local build from the posthog monorepo.
const localCli = path.resolve(__dirname, '../../posthog/cli/target/debug/posthog-cli')

/** @type {import('next').NextConfig} */
const nextConfig = {}

module.exports = withPostHogConfig(nextConfig, {
  personalApiKey: process.env.POSTHOG_API_KEY,
  projectId: process.env.POSTHOG_PROJECT_ID,
  host: process.env.POSTHOG_HOST,
  cliBinaryPath: localCli,
  sourcemaps: {
    enabled: true,
    releaseName: 'next-webpack-error-tracking-example',
    // Defaults to POSTHOG_RELEASE_MODE, which `pnpm build:releaseless` sets to `event`.
  },
})
