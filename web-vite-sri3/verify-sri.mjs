// Recompute the hash of every asset referenced with an integrity attribute in
// dist/index.html and compare it against that attribute. A MISMATCH means the
// browser will refuse to load the asset — the repro this project exists for.
// Informational only (always exits 0), so `pnpm start` still serves the broken
// site for inspection in a real browser.
import { createHash } from 'node:crypto'
import { readFile } from 'node:fs/promises'
import { join } from 'node:path'

const html = await readFile(join('dist', 'index.html'), 'utf8')
const tags = [...html.matchAll(/<(?:script|link)\b[^>]*>/g)].map((m) => m[0])

let checked = 0
let mismatches = 0
for (const tag of tags) {
  const integrity = tag.match(/integrity="([^"]+)"/)?.[1]
  const url = tag.match(/(?:src|href)="([^"]+)"/)?.[1]
  if (!integrity || !url) continue
  const [algo] = integrity.split('-')
  const file = await readFile(join('dist', url.replace(/^\//, '')))
  const actual = `${algo}-${createHash(algo).update(file).digest('base64')}`
  checked++
  if (actual === integrity) {
    console.log(`MATCH     ${url}`)
  } else {
    mismatches++
    console.log(`MISMATCH  ${url}`)
    console.log(`  integrity in index.html: ${integrity}`)
    console.log(`  actual hash on disk:     ${actual}`)
  }
}

if (checked === 0) {
  console.log('no integrity attributes found in dist/index.html — did the sri3 plugin run?')
} else if (mismatches > 0) {
  console.log(`\n${mismatches}/${checked} assets were modified after their SRI hash was computed —`)
  console.log('the browser will block them. Repro confirmed.')
} else {
  console.log(`\nall ${checked} hashes match — the site loads normally`)
}
