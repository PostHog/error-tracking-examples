import crypto from 'node:crypto'

export function threeRenamed(posthog) {
  const uuid = crypto.randomUUID()
  posthog.captureException(new Error(`boom ${uuid}`), 'user')
  return uuid
}
