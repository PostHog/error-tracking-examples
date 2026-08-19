import type { PostHog } from 'posthog-node'
import { two } from './two'

export function one(posthog: PostHog) {
  two(posthog)
}
