// Throws an uncaught error out of a Nitro route. The @posthog/nuxt Nitro plugin listens on
// Nitro's `error` hook (serverConfig.enableExceptionAutocapture) and captures it with
// posthog-node, so the exception carries the server chunk's frames. The marker comes from the
// probe, so the check can find this exact occurrence.
import { one } from '../lib/chain'

export default defineEventHandler((event) => {
  const marker = String(getQuery(event).marker ?? 'manual')
  one(marker)
})
