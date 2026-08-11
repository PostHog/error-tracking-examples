import type { PostHog } from 'posthog-node'
import { threeOriginal } from './three'

export function two(posthog: PostHog) {
  threeOriginal(posthog)
}
