import type { PostHog } from 'posthog-node'

export async function two(posthog: PostHog) {
  // Dynamic import so webpack emits `three` as its own chunk: the build then has two output
  // files, each with its own debug id and symbol set, and the throwing frame lives in the
  // lazily-loaded one.
  const { threeRenamedAsd } = await import(/* webpackChunkName: "three" */ './three')
  threeRenamedAsd(posthog)
}
