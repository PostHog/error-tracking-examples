import type { PostHog } from 'posthog-node'
import { threeChanged } from './three'

export function two(posthog: PostHog) {
  threeChanged(posthog)
}
