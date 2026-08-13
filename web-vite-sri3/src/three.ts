import type { PostHog } from 'posthog-js'

export function threeRenamed(posthog: PostHog) {
  posthog.captureException(new Error('boom'))
}
