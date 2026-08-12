import type { PostHog } from 'posthog-node'
import { threeAOIsdn } from './three'

export function two(posthog: PostHog) {
  threeAOIsdn(posthog)
}
