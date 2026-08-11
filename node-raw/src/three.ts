import type { PostHog } from 'posthog-node'

export function threeAsdf(posthog: PostHog) {
  posthog.captureException(new Error('boom'), 'user')
}
