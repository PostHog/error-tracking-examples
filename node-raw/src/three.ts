import type { PostHog } from 'posthog-node'

export function threeOriginal(posthog: PostHog) {
  posthog.captureException(new Error('boom'), 'user')
}
