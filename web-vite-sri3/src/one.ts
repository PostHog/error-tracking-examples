import type { PostHog } from 'posthog-js'
import { two } from './two'

export function one(posthog: PostHog) {
  two(posthog)
}
