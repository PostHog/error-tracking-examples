const { withPostHogConfig } = require('@posthog/nextjs-config')

/** @type {import('next').NextConfig} */
const nextConfig = {}

module.exports = withPostHogConfig(nextConfig, {
  personalApiKey: process.env.POSTHOG_API_KEY,
  projectId: process.env.POSTHOG_PROJECT_ID,
  host: process.env.POSTHOG_HOST,
  // No cliBinaryPath: the plugin finds node_modules/.bin/posthog-cli, which is the published
  // @posthog/cli this app depends on directly (see package.json).
  sourcemaps: {
    enabled: true,
    releaseName: 'next-webpack-error-tracking-example',
    // Defaults to POSTHOG_RELEASE_MODE, which `pnpm build:releaseless` sets to `event`.
  },
})
