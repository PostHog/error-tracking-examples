// Stamp a fresh build id into src/build.ts so consecutive builds differ. The
// Angular service worker only tries to install a new version when ngsw.json
// changes, and two builds of identical source produce an identical manifest.
import { writeFile } from 'node:fs/promises'

const build = process.env.BUILD_ID ?? new Date().toISOString().replace(/[-:.TZ]/g, '').slice(0, 14)
await writeFile(
  new URL('../src/build.ts', import.meta.url),
  `// Rewritten by \`pnpm build\` (bin/stamp-build.mjs) so every build ships
// different bytes: the service worker only attempts an update when the
// manifest changes, and identical builds would produce an identical manifest.
export const BUILD = '${build}';
`
)
console.log(`build id ${build}`)
