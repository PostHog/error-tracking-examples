// Recompute the SHA-1 of every asset listed in dist/<app>/browser/ngsw.json's
// hashTable and compare it against the recorded hash. This is exactly the check
// the Angular service worker performs when it installs a new app version: one
// MISMATCH and it discards the whole version and keeps serving the cached one.
//
//   node verify-ngsw.mjs --expect mismatch   # right after `posthog-cli sourcemap inject`
//   node verify-ngsw.mjs --expect match      # after `ngsw-config` regenerated the manifest
//
// Exits non-zero when the outcome differs from --expect, so `pnpm start` fails
// loudly if either half of the repro stops holding.
import { createHash } from 'node:crypto'
import { readFile } from 'node:fs/promises'
import { join } from 'node:path'

const dist = join('dist', 'web-angular-sw', 'browser')
const expect = process.argv[process.argv.indexOf('--expect') + 1]
if (!['match', 'mismatch'].includes(expect)) {
  console.error('usage: node verify-ngsw.mjs --expect match|mismatch')
  process.exit(2)
}

const manifest = JSON.parse(await readFile(join(dist, 'ngsw.json'), 'utf8'))
const entries = Object.entries(manifest.hashTable)

let mismatches = 0
for (const [url, recorded] of entries) {
  const file = await readFile(join(dist, url.replace(/^\//, '')))
  const actual = createHash('sha1').update(file).digest('hex')
  if (actual === recorded) {
    console.log(`MATCH     ${url}`)
  } else {
    mismatches++
    console.log(`MISMATCH  ${url}`)
    console.log(`  ngsw.json: ${recorded}`)
    console.log(`  on disk:   ${actual}`)
  }
}

if (entries.length === 0) {
  console.error('ngsw.json has an empty hashTable — is the service worker enabled in angular.json?')
  process.exit(1)
}

const outcome = mismatches > 0 ? 'mismatch' : 'match'
console.log(
  mismatches > 0
    ? `\n${mismatches}/${entries.length} assets changed after ngsw.json recorded their hashes — the service worker will reject this version.`
    : `\nall ${entries.length} hashes match — the service worker will install this version.`
)
if (outcome !== expect) {
  console.error(`expected ${expect}, got ${outcome}`)
  process.exit(1)
}
