import type { PostHog } from 'posthog-node'

const x = 'asd'

export function two(posthog: PostHog) {
  posthog.captureException(new Error('boom'), 'user')
}
