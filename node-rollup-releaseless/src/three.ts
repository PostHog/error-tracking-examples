import type { PostHog } from 'posthog-node'

export function three(posthog: PostHog) {
  posthog.captureException(new Error('boom'), 'user')
}
