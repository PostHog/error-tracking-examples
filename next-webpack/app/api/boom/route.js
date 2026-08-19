import { PostHog } from 'posthog-node'
import { one } from '../../../lib/one'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function GET() {
  const posthog = new PostHog(process.env.POSTHOG_KEY, {
    host: process.env.POSTHOG_HOST,
    // Short-lived per request: flush every event and don't wait on a timer.
    flushAt: 1,
    flushInterval: 0,
  })

  const uuid = one(posthog)
  await posthog.shutdown()

  return Response.json({ captured: true, uuid })
}
