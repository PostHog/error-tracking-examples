import type { PostHog } from 'posthog-node'

export function threeAOIsdn(posthog: PostHog) {
  posthog.captureException(new Error('boom'), 'user')
}
