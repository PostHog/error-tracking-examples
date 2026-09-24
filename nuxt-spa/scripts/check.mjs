// Reads <outputDir>/probe.json and asks PostHog what it made of the two exceptions: the release each
// one resolved to and every in-app frame with the file it resolved to. Then reports what the
// build did: the releases its CLI runs resolved and the errors the module caught (both quoted
// from build.log), the releases created, and the symbol sets uploaded. Polls until both events
// are ingested (up to two minutes).
//
// Reads credentials from this directory's .env (synced from the repo root by bin/copy-env). On the
// local stack the query endpoint needs more than the error_tracking scope the stored personal API
// key carries, so it logs in as the seeded dev user for that; the prod key (.env.prod) carries
// query:read and is used for everything. The release and symbol set lists always use the key.
import { existsSync, readFileSync, statSync } from 'node:fs'
import { outputDir, releaseName, run } from './run-config.mjs'

const DEV_EMAIL = 'test@posthog.com'
const DEV_PASSWORD = '12345678'
const PROBE_FILE = `${outputDir}/probe.json`
const BUILD_LOG = 'build.log'
const POLL_MS = 3000
const POLL_LIMIT_MS = 120_000
// The file both throw chains live in; a frame resolved back to it is a symbolicated frame.
const CHAIN_FILE = 'lib/chain.ts'
const CHAIN_DEPTH = 3

function readEnv() {
  const values = {}
  for (const raw of readFileSync('.env', 'utf8').split('\n')) {
    const line = raw.trim()
    if (!line || line.startsWith('#') || !line.includes('=')) continue
    const [key, ...rest] = line.split('=')
    values[key.trim()] = rest.join('=').trim()
  }
  return values
}

const env = readEnv()
const host = env.POSTHOG_CLI_HOST ?? 'http://localhost:8010'
const projectId = env.POSTHOG_CLI_ENV_ID ?? '1'
const apiKey = env.POSTHOG_CLI_TOKEN
// Only the local stack has a dev user to log in as.
const queryWithKey = (env.ENV_PROFILE ?? 'local') !== 'local'
const probe = JSON.parse(readFileSync(PROBE_FILE, 'utf8'))
if (probe.run !== run) {
  throw new Error(`${PROBE_FILE} is from run '${probe.run}', but this check is run '${run}' - probe first`)
}
const configuredRelease = releaseName

// What each run is there to show. The published module loses the server sourcemaps, and with
// deleteAfterUpload off its one failing upload loses the client ones too; the PR build keeps both.
const EXPECTED = {
  released: { server: false, client: true },
  'released-keep': { server: false, client: false },
  pr4779: { server: true, client: true },
  'pr4779-keep': { server: true, client: true },
}

// --- auth -----------------------------------------------------------------------------------

const cookies = {}
const cookieHeader = () =>
  Object.entries(cookies)
    .map(([k, v]) => `${k}=${v}`)
    .join('; ')

function rememberCookies(response) {
  for (const raw of response.headers.getSetCookie?.() ?? []) {
    const [pair] = raw.split(';')
    const [name, ...rest] = pair.split('=')
    cookies[name.trim()] = rest.join('=')
  }
}

async function login() {
  if (queryWithKey) return
  const attempts = [
    [`${host}/api/login/dev`, { email: DEV_EMAIL }],
    [`${host}/api/login`, { email: DEV_EMAIL, password: DEV_PASSWORD }],
  ]
  for (const [url, payload] of attempts) {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
    rememberCookies(response)
    if (response.ok) return
  }
  throw new Error(`could not log in to ${host} as ${DEV_EMAIL} - is the dev stack up?`)
}

async function query(hogql) {
  const response = await fetch(`${host}/api/projects/${projectId}/query/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(queryWithKey
        ? { Authorization: `Bearer ${apiKey}` }
        : { Cookie: cookieHeader(), 'X-CSRFToken': cookies.posthog_csrftoken ?? '' }),
    },
    body: JSON.stringify({ query: { kind: 'HogQLQuery', query: hogql } }),
  })
  if (!response.ok) throw new Error(`query failed: HTTP ${response.status} ${await response.text()}`)
  return (await response.json()).results ?? []
}

async function apiGet(path) {
  const response = await fetch(`${host}/api/projects/${projectId}/${path}`, {
    headers: { Authorization: `Bearer ${apiKey}` },
  })
  if (!response.ok) throw new Error(`GET ${path} failed: HTTP ${response.status}`)
  return response.json()
}

// --- exceptions -----------------------------------------------------------------------------

const asJson = (value) => {
  if (typeof value !== 'string') return value
  try {
    return JSON.parse(value)
  } catch {
    return null
  }
}

async function findExceptions() {
  const rows = await query(`
    select
      properties.$lib,
      JSONExtractString(properties.$exception_release, 'project'),
      JSONExtractString(properties.$exception_release, 'version'),
      properties.$exception_list,
      timestamp
    from events
    where event = '$exception'
      and timestamp > toDateTime('${probe.startedAt.slice(0, 19).replace('T', ' ')}') - interval 10 minute
      and (properties.$exception_list like '%${probe.serverMarker}%'
        or properties.$exception_list like '%${probe.clientMarker}%')
    order by timestamp desc
    limit 10
  `)
  const found = {}
  for (const [lib, project, version, exceptionList, timestamp] of rows) {
    const list = asJson(exceptionList) ?? []
    const side = JSON.stringify(list).includes(probe.serverMarker) ? 'server' : 'client'
    found[side] ??= { lib, project, version, list, timestamp }
  }
  return found
}

// posthog-node reports the H3 wrapper and its cause, which share their frames; show each once.
function uniqueFrames(list) {
  const seen = new Set()
  const frames = []
  for (const frame of list.flatMap((exception) => exception?.stacktrace?.frames ?? [])) {
    const key = `${frame.source}:${frame.line}:${frame.resolved_name ?? frame.mangled_name}`
    if (seen.has(key)) continue
    seen.add(key)
    frames.push(frame)
  }
  return frames
}

function printSide(side, hit) {
  console.log(`\n  ${side} exception (${hit.lib}, ${String(hit.timestamp).slice(0, 19)})`)
  console.log(`    release : ${hit.project ? `${hit.project}@${hit.version}` : 'none resolved'}`)
  const frames = uniqueFrames(hit.list)
  const inApp = frames.filter((frame) => frame.in_app !== false)
  const shown = inApp.length ? inApp : frames
  console.log('    frames  :')
  for (const frame of shown.slice(0, 10)) {
    const mark = frame.resolved ? '✓' : '✗'
    const name = frame.resolved_name ?? frame.mangled_name ?? '?'
    const where = `${frame.source ?? '?'}:${frame.line ?? '?'}`
    const notes = []
    if (!frame.resolved) notes.push(frame.resolve_failure ?? 'not resolved')
    if (!frame.junk_drawer?.raw_frame?.chunk_id && !frame.chunk_id) notes.push('no chunk id')
    console.log(`      ${mark} ${name.padEnd(20)} ${where}${notes.length ? `  (${notes.join(', ')})` : ''}`)
  }
  const chainFrames = frames.filter((frame) => frame.resolved && String(frame.source ?? '').endsWith(CHAIN_FILE))
  const symbolicated = chainFrames.length >= CHAIN_DEPTH
  if (symbolicated) {
    console.log(`    verdict : SYMBOLICATED - ${chainFrames.length} frames resolve back to ${CHAIN_FILE}`)
  } else {
    const bundle = frames.find((frame) => /boom|chain/.test(String(frame.source ?? '')))?.source
    console.log(
      bundle
        ? `    verdict : NOT SYMBOLICATED - the throw chain still reads ${bundle}`
        : `    verdict : NOT SYMBOLICATED - no frame resolves back to ${CHAIN_FILE}`
    )
  }
  return symbolicated
}

// --- what the build did ----------------------------------------------------------------------

const stripAnsi = (text) => text.replace(/\x1b\[[0-9;]*m/g, '')

function printBuildLog() {
  if (!existsSync(BUILD_LOG)) {
    console.log(`\n  (no ${BUILD_LOG} - run \`pnpm build\` through scripts/build.mjs to record the CLI output)`)
    return
  }
  const lines = stripAnsi(readFileSync(BUILD_LOG, 'utf8')).split('\n')

  console.log('\n  releases the build resolved (from build.log):')
  const releaseLines = lines.filter((line) => line.includes('posthog_cli::api::releases'))
  if (!releaseLines.length) console.log('      (none logged)')
  for (const line of releaseLines) {
    const text = line.replace(/^.*posthog_cli::api::releases:\s*/, '').trim()
    const name = text.match(/release ([^@\s]+)@/i)?.[1]
    const note = name && name !== configuredRelease ? '   <- derived from the git checkout, not the configured release' : ''
    console.log(`      ${text}${note}`)
  }

  console.log('  CLI errors the module caught (from build.log):')
  const errorLines = lines.filter((line) => /^Oops!|^\s+\d+: |^\s*ERROR\s+Failed|Failed to (process|upload)/.test(line))
  if (!errorLines.length) console.log('      (none)')
  for (const line of errorLines) console.log(`      ${line.trim().slice(0, 160)}`)
}

// `pnpm clean` removes .nuxt and `nuxt build` recreates it first thing, so the directory's
// birth time is when the build - and its release creation - started.
function buildStartedAt() {
  try {
    return new Date(statSync('.nuxt').birthtimeMs - 5_000)
  } catch {
    return new Date(new Date(probe.startedAt).getTime() - 10 * 60_000)
  }
}

async function printBuildArtifacts() {
  const since = buildStartedAt()
  const releases = (await apiGet('error_tracking/releases/?limit=50')).results.filter(
    (release) => new Date(release.created_at) >= since
  )
  console.log(`  releases created by this build (since ${since.toISOString().slice(11, 19)}Z):`)
  if (!releases.length) console.log('      (none - every release the build resolved already existed)')
  for (const release of releases) console.log(`      ${release.project}@${release.version}`)

  const symbolSets = (await apiGet('error_tracking/symbol_sets/?order_by=-created_at&limit=100')).results.filter(
    (set) => new Date(set.created_at) >= since
  )
  // A record with a failure reason is not an upload: PostHog writes one when it tried to fetch a
  // chunk it had no symbol set for, from the URL in the frame, and could not.
  const byRelease = new Map()
  for (const set of symbolSets) {
    const release = set.failure_reason
      ? `not uploaded; PostHog tried to fetch it from the frame's URL and failed (${set.failure_reason})`
      : set.release
        ? `uploaded, bound to ${set.release.project}@${set.release.version}`
        : 'uploaded, no release'
    byRelease.set(release, (byRelease.get(release) ?? 0) + 1)
  }
  console.log(`  symbol set records created during this build: ${symbolSets.length}`)
  for (const [release, count] of byRelease) console.log(`      ${count} ${release}`)
}

// --- main -----------------------------------------------------------------------------------

console.log(`check: run ${run}, waiting for both exceptions to be ingested`)
await login()
const deadline = Date.now() + POLL_LIMIT_MS
let found = {}
while (Date.now() < deadline) {
  found = await findExceptions()
  if (found.server && found.client) break
  await new Promise((r) => setTimeout(r, POLL_MS))
}

console.log(`\nnuxt-spa (${run}): what PostHog made of the two exceptions`)
const results = {}
for (const side of ['server', 'client']) {
  if (found[side]) {
    results[side] = printSide(side, found[side])
  } else {
    console.log(`\n  ${side} exception: NOT FOUND within ${POLL_LIMIT_MS / 1000}s (marker ${probe[`${side}Marker`]})`)
    results[side] = false
  }
}
printBuildLog()
try {
  await printBuildArtifacts()
} catch (error) {
  // Informative only: the verdict above does not depend on these lists.
  console.log(`  (could not list releases and symbol sets: ${error.message})`)
}

// The exit code says whether the run showed what it is there to show.
const expected = EXPECTED[run]
const describe = (r) => `server ${r.server ? 'symbolicated' : 'NOT symbolicated'}, client ${r.client ? 'symbolicated' : 'NOT symbolicated'}`
const matches = results.server === expected.server && results.client === expected.client
console.log(`\nresult  : ${describe(results)}`)
console.log(`expected: ${describe(expected)} for run ${run}${matches ? ' - matches' : ' - DOES NOT MATCH'}`)
process.exit(matches ? 0 : 1)
