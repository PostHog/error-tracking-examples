import { PostHog } from 'posthog-node'
import 'dotenv/config'

const client = new PostHog(process.env.POSTHOG_KEY ?? '', {
  host: process.env.POSTHOG_HOST,
  // Short-lived script: flush every event and don't wait on a timer.
  flushAt: 1,
  flushInterval: 0,
})

const distinctId = 'error-tracking-example'

class PaymentDeclinedError extends Error {
  constructor(reason: string) {
    super(`Payment declined: ${reason}`)
    this.name = 'PaymentDeclinedError'
  }
}

// Each scenario throws from its own nested call chain, so every captured
// exception carries a distinct multi-frame stack that source maps must resolve.

function readMissingProperty(): string {
  const user = undefined as unknown as { profile: { name: string } }
  return user.profile.name
}
function loadProfile(): string {
  return readMissingProperty()
}

function formatPrice(value: number): string {
  return value.toFixed(999)
}
function renderInvoice(): string {
  return formatPrice(42)
}

function parseConfig(): unknown {
  return JSON.parse('{ "unclosed": ')
}
function bootstrap(): unknown {
  return parseConfig()
}

function chargeCard(): never {
  throw new PaymentDeclinedError('insufficient_funds')
}
function checkout(): never {
  return chargeCard()
}

async function fetchRemote(): Promise<never> {
  return Promise.reject(new Error('Upstream service timed out after 30s'))
}
async function syncData(): Promise<void> {
  await fetchRemote()
}

type Scenario = { name: string; run: () => unknown | Promise<unknown> }

const scenarios: Scenario[] = [
  { name: 'type-error', run: loadProfile },
  { name: 'range-error', run: renderInvoice },
  { name: 'syntax-error', run: bootstrap },
  { name: 'payment-declined', run: checkout },
  { name: 'async-rejection', run: syncData },
]

for (const scenario of scenarios) {
  try {
    await scenario.run()
  } catch (error) {
    client.captureException(error, distinctId, { scenario: scenario.name })
    console.log(`captured ${scenario.name}: ${(error as Error).message}`)
  }
}

await client.shutdown()
console.log(`done — ${scenarios.length} exceptions sent to PostHog error tracking`)
