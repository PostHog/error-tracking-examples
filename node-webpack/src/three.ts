import type { PostHog } from 'posthog-node'

export function threeRenamedAsdafoindifna(posthog: PostHog) {
  posthog.captureException(new Error('boom'), 'user')
}
