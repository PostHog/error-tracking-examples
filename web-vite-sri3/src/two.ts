import type { PostHog } from 'posthog-js'
import { threeRenamed } from './three'

export function two(posthog: PostHog) {
  threeRenamed(posthog)
}
