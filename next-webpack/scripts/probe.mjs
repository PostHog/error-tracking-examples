// Starts the built app, hits /api/boom once so the server captures an exception, then exits.
// Deterministic and headless, so the mprocs proc can run build + capture end to end.
import { spawn } from 'node:child_process'

const PORT = 3210
const server = spawn('./node_modules/.bin/next', ['start', '-p', String(PORT)], {
  stdio: ['ignore', 'pipe', 'inherit'],
})
server.stdout.pipe(process.stdout)

async function waitForServer() {
  for (let i = 0; i < 60; i++) {
    try {
      const res = await fetch(`http://localhost:${PORT}/`)
      if (res.ok) return
    } catch {}
    await new Promise((r) => setTimeout(r, 500))
  }
  throw new Error('server did not become ready')
}

try {
  await waitForServer()
  const res = await fetch(`http://localhost:${PORT}/api/boom`)
  const body = await res.json()
  console.log(`probe: captured exception, uuid marker: ${body.uuid}`)
  console.log('probe: look for an $exception whose message ends with that marker')
} finally {
  server.kill('SIGTERM')
}
