import type { PostHog } from 'posthog-node'
import { threeLegacySdkNoReleaseIdOnTheEvent } from './three'

export function two(posthog: PostHog) {
  threeLegacySdkNoReleaseIdOnTheEvent(posthog)
}
