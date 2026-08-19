import type { PostHog } from 'posthog-node'

export function threeRenamedAsd(posthog: PostHog) {
  posthog.captureException(new Error('boom'), 'user')
}
