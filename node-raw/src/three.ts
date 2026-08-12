import type { PostHog } from 'posthog-node'

export function threeSEROIGNROIGHN(posthog: PostHog) {
  posthog.captureException(new Error('boom'), 'user')
}
