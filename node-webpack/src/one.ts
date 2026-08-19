import type { PostHog } from 'posthog-node'
import { two } from './two'

export async function one(posthog: PostHog) {
  await two(posthog)
}
