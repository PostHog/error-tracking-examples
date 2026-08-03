import { PostHog } from 'posthog-node'
import { one } from './one'

const posthog = new PostHog(process.env.POSTHOG_KEY!, { host: process.env.POSTHOG_HOST, flushAt: 1 })
posthog.debug(true)

console.log('starting')

one(posthog)

posthog.shutdown();

console.log("stopping")