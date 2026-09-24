// Starts the built app, triggers one server exception and one client exception, each tagged
// with its own marker, and writes the markers to <outputDir>/probe.json for scripts/check.mjs.
// Headless end to end: the server route is fetched, the client button is clicked in the
// installed Google Chrome through playwright-core.
//
// The server is stopped before the click. The client frames carry the URL the chunk was loaded
// from, and when PostHog has no symbol set for a chunk id it fetches the chunk from that URL and
// follows its `//# sourceMappingURL=` comment. In the keep-maps runs the maps are still on disk,
// so a server that is still up would let PostHog fetch them itself and hide whether the module
// uploaded them. With the server down, only the upload can resolve the frames. The page is
// already loaded by then, and posthog-js talks to PostHog, not to the app.
import { spawn } from 'node:child_process'
import { randomUUID } from 'node:crypto'
import { writeFileSync } from 'node:fs'
import { chromium } from 'playwright-core'
import { keepMaps, outputDir, port, run, variant } from './run-config.mjs'

const BASE = `http://localhost:${port}`
const serverMarker = randomUUID()
const clientMarker = randomUUID()

const server = spawn(process.execPath, [`${outputDir}/server/index.mjs`], {
  env: { ...process.env, PORT: String(port), HOST: '127.0.0.1' },
  stdio: ['ignore', 'pipe', 'inherit'],
})
server.stdout.pipe(process.stdout)
const serverExited = new Promise((resolve) => server.on('exit', resolve))

async function waitForServer() {
  for (let i = 0; i < 60; i++) {
    try {
      const res = await fetch(`${BASE}/`)
      if (res.ok) return
    } catch {}
    await new Promise((r) => setTimeout(r, 500))
  }
  throw new Error('server did not become ready')
}

async function stopServer() {
  if (server.exitCode !== null) return
  server.kill('SIGTERM')
  await Promise.race([serverExited, new Promise((r) => setTimeout(r, 5000))])
  if (server.exitCode === null) server.kill('SIGKILL')
}

// posthog-js posts plain JSON with disable_compression on, but older builds fall back to a
// base64 `data=` form body, so decode both before looking for the marker.
function bodyHas(request, text) {
  const body = request.postData() ?? ''
  if (body.includes(text)) return true
  const match = body.match(/^data=(.+)$/)
  if (!match) return false
  try {
    return Buffer.from(decodeURIComponent(match[1]), 'base64').toString().includes(text)
  } catch {
    return false
  }
}

const isEventsRequest = (request) => request.method() === 'POST' && /\/(e|i\/v0\/e)\/?(\?|$)/.test(request.url())

try {
  await waitForServer()
  const startedAt = new Date().toISOString()

  const res = await fetch(`${BASE}/api/boom?marker=${serverMarker}`)
  console.log(`probe: GET /api/boom -> ${res.status} (server marker ${serverMarker})`)

  const browser = await chromium.launch({ channel: 'chrome', headless: true })
  try {
    const page = await browser.newPage()
    page.on('pageerror', (error) => console.log(`probe: page error: ${error.message}`))
    await page.goto(`${BASE}/?marker=${clientMarker}`)
    await page.waitForSelector('#throw')
    const builtRun = (await page.locator('#run').textContent()).trim()
    if (builtRun !== run) {
      throw new Error(`the build in ${outputDir} is run '${builtRun}', but this probe is run '${run}' - rebuild first`)
    }

    // The Nitro plugin flushes posthog-node right after capturing; give it a moment, then take
    // the app server down before the client exception exists (see the header comment).
    await new Promise((r) => setTimeout(r, 1500))
    await stopServer()
    console.log('probe: app server stopped; the client exception is sent with the app unreachable')

    const sent = page.waitForRequest((request) => isEventsRequest(request) && bodyHas(request, clientMarker), {
      timeout: 20_000,
    })
    await page.click('#throw')
    const request = await sent
    const response = await request.response()
    console.log(
      `probe: client exception posted to ${new URL(request.url()).pathname} -> ${response?.status()} (client marker ${clientMarker})`
    )
  } finally {
    await browser.close()
  }

  writeFileSync(
    `${outputDir}/probe.json`,
    JSON.stringify({ run, variant, keepMaps, startedAt, serverMarker, clientMarker }, null, 2) + '\n'
  )
  console.log(`probe: run ${run}, markers written to ${outputDir}/probe.json`)
} finally {
  await stopServer()
}
