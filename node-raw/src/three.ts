import type { PostHog } from 'posthog-node'

export function threeChanged(posthog: PostHog) {
  posthog.captureException(new Error('boom'), 'user')
}
