import type { PostHog } from 'posthog-node'
import { threeRenamed } from './three'

export function two(posthog: PostHog) {
  threeRenamed(posthog)
}
