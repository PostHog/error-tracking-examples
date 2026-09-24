import type { PostHog } from 'posthog-node'

export function threeLegacySdkNoReleaseIdOnTheEvent(posthog: PostHog) {
  posthog.captureException(new Error('boom from a legacy SDK'), 'user')
}
