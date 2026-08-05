import { PostHog } from 'posthog-node'
import { one } from './one'

const posthog = new PostHog(process.env.POSTHOG_KEY!, {
  host: process.env.POSTHOG_HOST,
  // Short-lived script: flush every event and don't wait on a timer.
  flushAt: 1,
  flushInterval: 0,
})
posthog.debug(true)

console.log('starting')

one(posthog)

await posthog.shutdown()

console.log('stopping')
