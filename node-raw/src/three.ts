import type { PostHog } from 'posthog-node'

export function threeAfgfg(posthog: PostHog) {
  posthog.captureException(new Error('boom'), 'user')
}
