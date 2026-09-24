// Runs `nuxt build` and mirrors its output into build.log, so scripts/check.mjs can quote the
// release lines and the CLI error the module catches. Exits with the build's own exit code.
import { spawn } from 'node:child_process'
import { createWriteStream } from 'node:fs'
import { fileURLToPath } from 'node:url'

const nuxt = fileURLToPath(new URL('../node_modules/.bin/nuxt', import.meta.url))
const log = createWriteStream('build.log')
const child = spawn(nuxt, ['build'], { stdio: ['ignore', 'pipe', 'pipe'], env: process.env })
for (const stream of [child.stdout, child.stderr]) {
  stream.on('data', (chunk) => {
    process.stdout.write(chunk)
    log.write(chunk)
  })
}
child.on('close', (code) => {
  log.end()
  process.exit(code ?? 1)
})
