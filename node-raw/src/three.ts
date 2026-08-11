import type { PostHog } from 'posthog-node'

export function threeJefiovn(posthog: PostHog) {
  posthog.captureException(new Error('boom'), 'user')
}
