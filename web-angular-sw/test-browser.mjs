// End-to-end proof in a real browser (the installed Google Chrome, headless,
// driven by playwright-core) that the hash mismatch actually strands users on
// the old version — and that regenerating ngsw.json fixes it.
//
//   1. Build v1, inject, regenerate the manifest, serve. Load the page until the
//      service worker controls it.
//   2. Build v2 and inject WITHOUT regenerating. Ask the service worker to
//      check for updates: expect VERSION_INSTALLATION_FAILED, and a reload
//      still shows v1.
//   3. Regenerate v2's manifest. Check again: expect VERSION_READY, and a
//      reload shows v2.
//
// Uses the .env-backed posthog-cli inject (no upload) so it works without a
// release being created against a running PostHog.
import { execSync, spawn } from 'node:child_process'
import { chromium } from 'playwright-core'

const PORT = 8083
const run = (cmd) => execSync(cmd, { stdio: 'inherit', env: { ...process.env, PORT } })
const build = (id) => {
  run(`BUILD_ID=${id} pnpm build`)
  run('pnpm inject')
}

let failed = false
const check = (label, ok) => {
  console.log(`${ok ? 'PASS' : 'FAIL'}  ${label}`)
  if (!ok) failed = true
}

// Terminate every running service worker (Chrome DevTools Protocol) so the next
// navigation starts a fresh worker instance, the way an idle timeout would.
async function stopServiceWorkers(page) {
  const cdp = await page.context().newCDPSession(page)
  await cdp.send('ServiceWorker.enable')
  await cdp.send('ServiceWorker.stopAllWorkers')
  await cdp.detach()
}

build('v1')
run('pnpm regen')

const server = spawn(process.execPath, ['serve.mjs'], { stdio: 'inherit', env: { ...process.env, PORT } })
await new Promise((r) => setTimeout(r, 500))

const browser = await chromium.launch({ channel: 'chrome', headless: true })
try {
  const page = await browser.newPage()
  const url = `http://localhost:${PORT}/`
  const buildShown = () => page.locator('#build').textContent()
  const swStatus = () => page.locator('#sw').textContent()

  // 1. v1 with a valid manifest: the service worker installs and takes control.
  await page.goto(url)
  await page.waitForFunction(() => navigator.serviceWorker?.controller != null, null, { timeout: 30_000 })
  await page.reload()
  await page.waitForSelector('#sw')
  check(`v1 served, sw ${await swStatus()}`, (await buildShown()) === 'v1')

  // 2. v2 injected without regenerating ngsw.json: the update must be rejected.
  build('v2')
  const brokenFound = await page.evaluate(() => globalThis.__checkForUpdate())
  await page.waitForFunction(
    () => /VERSION_READY|VERSION_INSTALLATION_FAILED|NO_NEW_VERSION_DETECTED/.test(document.querySelector('#sw')?.textContent ?? ''),
    null,
    { timeout: 30_000 }
  )
  const brokenStatus = await swStatus()
  check(`broken v2 update rejected (checkForUpdate=${brokenFound}, status ${brokenStatus})`, brokenStatus === 'VERSION_INSTALLATION_FAILED')

  // Right after the failure the worker sits in EXISTING_CLIENTS_ONLY and lets a
  // brand-new navigation fall through to the network. That state is in-memory
  // only: the browser terminates idle workers within seconds, and the restarted
  // worker comes back NORMAL with the last *good* version and serves it from
  // cache — which is what real users hit on their next visit. Simulate the
  // restart instead of waiting for it.
  await stopServiceWorkers(page)
  await page.reload()
  await page.waitForSelector('#build')
  check(`next visit after a worker restart is still served v1 from cache (shown: ${await buildShown()})`, (await buildShown()) === 'v1')

  // 3. Regenerate v2's manifest: now the update installs and users get v2.
  run('pnpm regen')
  const fixedFound = await page.evaluate(() => globalThis.__checkForUpdate())
  await page.waitForFunction(
    () => /VERSION_READY|VERSION_INSTALLATION_FAILED/.test(document.querySelector('#sw')?.textContent ?? ''),
    null,
    { timeout: 30_000 }
  )
  const fixedStatus = await swStatus()
  check(`regenerated v2 update accepted (checkForUpdate=${fixedFound}, status ${fixedStatus})`, fixedStatus === 'VERSION_READY')
  await page.reload()
  await page.waitForSelector('#build')
  check(`after reload users are on v2 (shown: ${await buildShown()})`, (await buildShown()) === 'v2')
} finally {
  await browser.close()
  server.kill()
}

console.log(failed ? '\nbrowser test FAILED' : '\nbrowser test passed: the mismatch strands users on the old version, ngsw-config regeneration fixes it')
process.exit(failed ? 1 : 0)
