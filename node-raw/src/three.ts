import type { PostHog } from 'posthog-node'
//asdf
export function threeAdiognrg(posthog: PostHog) {
  posthog.captureException(new Error('boom'), 'user')
}
