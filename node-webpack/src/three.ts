import type { PostHog } from 'posthog-node'

export function threeRenamed(posthog: PostHog) {
  posthog.captureException(new Error('boom'), 'user')
}
