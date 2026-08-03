import type { PostHog } from 'posthog-js'

export function three(posthog: PostHog) {
  posthog.captureException(new Error('boom'))
}
