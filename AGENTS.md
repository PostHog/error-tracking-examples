# AGENTS.md

This repo is a lab of minimal apps. Each one exercises PostHog error tracking end to end, against a
local PostHog, for one SDK/tooling combination: it builds, uploads its symbols (source maps,
mappings, dSYMs), runs, captures an exception, and exits. The examples reproduce bugs, prove fixes
and show how the release modes differ, so a person or an agent should be able to run any of them
with one command and read the result.

**If you need an example that is not in the [index](#index), create it.** Follow
[Creating an example](#creating-an-example) so it is as easy to run as the others. Don't bend an
existing example to cover an unrelated case.

`README.md` explains what each example proves and why. This file covers running the examples,
where their configuration comes from, and how to add one.

## Before running anything

1. **A local PostHog must be up at `http://localhost:8010`.** It runs from the sibling `../posthog`
   checkout, not from this repo. Check it with
   `curl -s -o /dev/null -w '%{http_code}' http://localhost:8010/_health`; anything but `200` means
   uploads and captures will fail. If it is down, say so. Don't work around it, and don't report an
   example as working.
2. **Sync credentials:** `bin/copy-env`. It is idempotent and cheap. mprocs runs it on every
   launch, but you are not running mprocs, so run it yourself.
3. **Check the example's toolchain** (pnpm, cargo, flutter, uv, ruby, composer, Android SDK, Xcode)
   and any sibling checkout it builds from (see the index). Most `run` scripts fail early with an
   install hint when something is missing.

## Running an example

`mprocs --config mprocs.yaml` is how a human runs them. It is a TUI, so don't use it yourself.
Every proc in `mprocs.yaml` is a `shell` command run in a `cwd`, so run that command in that
directory. The shapes are:

```bash
cd node-raw && pnpm install && pnpm start               # JS: legacy release mode
cd node-raw && pnpm install && pnpm start:releaseless   # JS: --release-mode=event
rust-releaseless/run                                    # everything else: an executable ./run
APP_VERSION=2.0.0 rust-releaseless/run                  # the same code, shipped as a second release
```

Shipping unchanged code under a new version is the case that separates the release modes. The
`run` scripts and the expo builds take the version from `APP_VERSION`, and the android ones take it
as an argument (`./run 2.0.0`). The JS examples don't take a version.

Most runs build, upload, capture and exit on their own. The exceptions:

- **They serve until stopped:** `web-raw` (:8080), `web-vite-sri3` (:8081), `web-angular-sw`,
  `flutter-web-*` (:7801/:7802; `POSTHOG_NO_OPEN=1` stops them opening a browser tab). Run them in
  the background and stop them when you are done. `web-raw` captures only once a browser loads the
  page. The flutter apps throw two seconds after load.
- **They need a device:** `android-*` boots an emulator and streams logcat until interrupted, and
  a human has to tap **Capture exception**. `react-native-expo`'s `pnpm ios` builds for the iOS
  simulator and waits about 50s for the crash report to flush. `pnpm sourcemaps` covers the
  upload without Xcode.
- **They need no credentials or server:** `web-webpack-sml` is build-only.

### Checking the result

The upload's output already tells you a lot: `N chunk(s) uploaded`, `N skipped (N already
present)`, `release_id_mismatch`. To see what PostHog made of the exception:

- `bin/check-expo`, `bin/check-flutter` and `bin/check-rust` print the release each variant
  resolved to and its symbolicated in-app frames. `nuxt-spa` runs its own check as part of
  `pnpm start`.
- For anything else, query the events the way those scripts do: log in as the seeded dev user
  (`POST /api/login/dev`) and send HogQL to `/api/projects/1/query/`. The personal API key in
  `.env` is scoped to error tracking and cannot query. Copy a `bin/check-*` script when a new
  example deserves one.
- The UI is at `http://localhost:8010/project/1/error_tracking`.

A frame that still shows a minified or bundle path means the symbols never landed or the chunk id
differs.

## Configuration: where env values come from

The **root `.env` is the only source.** It is gitignored. `bin/copy-env`:

1. Bootstraps it for project 1 when it is missing.
2. Validates it against the local PostHog and repairs it. A dead personal API key is replaced: the
   script logs in as `test@posthog.com` and mints a new key labeled `error-tracking-examples` with
   `error_tracking:read`/`write` scopes. `POSTHOG_KEY` is reset to project 1's token.
3. Copies it to `<example>/.env` in **every top-level directory except `bin/`**, overwriting what
   is there.

So **never edit an example's `.env`**, because the next sync replaces it. Change the root `.env`,
or the template in `bin/copy-env` when a variable should exist for everyone.

| Variable | What it is | Used by |
| --- | --- | --- |
| `POSTHOG_HOST` | `http://localhost:8010` | SDKs at runtime |
| `POSTHOG_KEY` | project 1's public token | SDKs at runtime |
| `POSTHOG_CLI_HOST`, `POSTHOG_CLI_ENV_ID`, `POSTHOG_CLI_TOKEN` | host, project id, personal API key | `posthog-cli --dotenv-file .env` |
| `POSTHOG_API_KEY`, `POSTHOG_PROJECT_ID` | the same key and project, under the names the bundler plugins read | rollup/webpack/next/nuxt plugins |

How each toolchain reads its copy: `node --env-file=.env`, `posthog-cli --dotenv-file .env`,
`dotenv` in bundler configs, Next and Nuxt load it themselves, `run` scripts `set -a; . ./.env; set +a`
before exec, Android via the `posthog.dotenvFile` gradle property, Flutter via `--dart-define`,
Expo by re-exporting as `EXPO_PUBLIC_*`.

Never hardcode or commit a key. The older `web-raw`, `web-vite-sri3` and `ios-raw` inline the
token `e2e_token_1239` instead of reading `.env`. Don't copy that into a new example.

## Index

Modes: **L** = legacy (the upload binds the symbol set to a release), **R** = releaseless
(`--release-mode=event`, release id injected into the build output), **E** = release env (release
id handed to the SDK in `POSTHOG_RELEASE_ID`), **Repro** = reproduces one bug.

| Example | Stack | Mode | Run | Builds against |
| --- | --- | --- | --- | --- |
| `android-legacy` | Android, Kotlin, R8 | L | `./run [versionName]` | `../posthog-android` → `~/.m2` |
| `android-releaseless` | same app | R | `./run [versionName]` | `../posthog-android` → `~/.m2` |
| `flutter-web-legacy` | Flutter web | L | `./run` | published |
| `flutter-web-releaseless` | same app | R | `./run` | published |
| `ios-raw` | Swift, Xcode | — | open in Xcode, no proc | `../posthog-ios` (SwiftPM) |
| `next-webpack` | Next.js 15, `@posthog/nextjs-config` | L, R | `pnpm start`, `pnpm start:releaseless` | `vendor/*.tgz` |
| `node-legacy-sdk` | Node, posthog-node 5.46.1 (predates `$release_id`) | R | `pnpm start` | published |
| `node-raw` | Node, esbuild, bare `posthog-cli` | L, R | `pnpm start`, `pnpm start:releaseless` | published |
| `node-rollup` | Node, `@posthog/rollup-plugin` | L, R | `pnpm start`, `pnpm start:releaseless` | `vendor/*.tgz` |
| `node-webpack` | Node, `@posthog/webpack-plugin`, two chunks | L, R | `pnpm start`, `pnpm start:releaseless` | `vendor/*.tgz` |
| `nuxt-spa` | Nuxt 4 SPA, `@posthog/nuxt` | Repro [posthog-js#4779](https://github.com/PostHog/posthog-js/pull/4779) | `pnpm start` (+ `:keep`, `:fixed`, `:fixed:keep`) | published + `vendor/*.tgz` |
| `php-release-env` | PHP | E | `./run` | `../posthog-php`, local CLI |
| `python-release-env` | Python | E | `./run` | `../posthog-python`, local CLI |
| `react-native-expo` | Expo, Hermes, iOS simulator | L, R | `pnpm ios`, `pnpm ios:releaseless`; `pnpm sourcemaps(:releaseless)` | `vendor/*.tgz`, local CLI |
| `ruby-release-env` | Ruby | E | `./run` | `../posthog-ruby`, local CLI |
| `rust-raw` | Rust, DWARF/dSYM | L | `./run` | published |
| `rust-release-env` | same binary | E | `./run` | `../posthog-rs`, local CLI |
| `rust-releaseless` | same binary | R | `./run` | `../posthog-rs`, local CLI |
| `web-angular-sw` | Angular 22 + service worker | Repro [posthog#86046](https://github.com/PostHog/posthog/issues/86046) | `pnpm start`, `pnpm test:browser` | published |
| `web-raw` | browser, esbuild, bare `posthog-cli` | L, R | `pnpm start`, `pnpm start:releaseless` | `vendor/posthog-js` |
| `web-vite-sri3` | Vite + `vite-plugin-sri3` | Repro (fails by design) | `pnpm start` | published |
| `web-webpack-sml` | webpack + `source-map-loader` | Repro [posthog-js#4724](https://github.com/PostHog/posthog-js/issues/4724) | `pnpm build`, `pnpm build:before` | published |

"Local CLI" means `bin/posthog-cli-local`, which builds and runs the working copy in
`../posthog/cli` (override the checkout with `POSTHOG_REPO`). The sibling checkouts live next to
this repo, under `../`.

## Creating an example

### Decide whether it is new

- The same app in another release mode belongs in the **same directory** as another script
  (`start` / `start:releaseless`), as long as the variants can share dependencies and app identity.
- Make a **sibling directory** when they can't, for example a different applicationId, SDK version
  or crate. Name the pair by mode (`android-legacy` / `android-releaseless`,
  `rust-raw` / `rust-releaseless` / `rust-release-env`) and keep the code identical except for the
  one thing that differs.
- A new SDK, bundler, framework or bug is a new example.

### Name it

`<platform>-<tooling>`, lowercase kebab: `node-rollup`, `next-webpack`, `flutter-web-releaseless`.
`-raw` means the SDK plus `posthog-cli`, with no bundler plugin or framework integration. A mode
suffix (`-legacy`, `-releaseless`, `-release-env`) marks a directory that exists for one mode. A
reproduction is named after the tooling involved (`web-vite-sri3`, `web-webpack-sml`) and links its
issue or PR in its README and in its `package.json` description.

### Keep the app minimal

Keep only what the path under test needs. No UI beyond one button (and only when a click is the
thing being tested), no styling, routing, state management, tests, linters or CI. Use a framework
only when the framework is what is being tested.

- **Throw through a three-deep call chain across three files:** `one` → `two` → `three`, where the
  deepest one captures an error (`new Error('boom')`). A symbolicated stack then shows several
  in-app frames in different files, and a broken upload is obvious. Copy these files from the
  closest existing example.
- **Capture without a human.** Capture on start, on a timer after page load, or through a headless
  probe (`next-webpack/scripts/probe.mjs`, `nuxt-spa/scripts/probe.mjs`). Flush or shut the client
  down before exit, because every SDK batches.
- **Print what it is doing:** `starting`, the release it will report, `stopping`.
- **Give it a message or app name of its own** when it must not merge into another example's
  issue.

### Make it one command

- **JS:** `package.json` scripts `clean`, `build`, `process` (the upload), `run:app`, and `start`
  chaining them. Add `start:releaseless` when both modes apply. Put `@posthog/cli` in
  devDependencies directly, so a plugin's older pinned copy never wins the binary lookup.
- **Everything else:** an executable `run` (`chmod +x`, and check `git ls-files -s` shows `100755`),
  bash with `set -euo pipefail` and `cd "$(dirname "$0")"`. It checks for its toolchain with an
  install hint, builds, uploads with `--dotenv-file .env`, sources `.env`, and `exec`s the app.
- In a `run` script, take the release version from `APP_VERSION` (default `1.0.0`).
- **Don't prompt, and exit non-zero on failure.** A server should use a port no other example uses
  and let `PORT` override it.
- Upload source with the symbols wherever the platform allows (`--include-source`,
  `sourcesContent`), so frames get source context.
- Reuse `bin/` rather than copying it: `posthog-cli-local`, `install-posthog-cli-local`,
  `publish-posthog-local`, `android-run`, `flutter-web-lib`.

### Dependencies

- **Prefer published packages.** Pin the one under test to an exact version and commit the
  lockfile.
- **For unreleased SDK or plugin changes**, either pack them from their branch into
  `vendor/*.tgz` (`pnpm pack`) and consume them with `file:` plus pnpm `overrides` for transitive
  copies, or build from the sibling checkout on every run (cargo path dependency, wheel, gem or
  composer path repository) with an `<SDK>_REPO` variable to override the path.
- **For unreleased CLI flags**, use `../bin/posthog-cli-local`.
- **Say why each local dependency is local:** in a comment next to it, and in the README with the
  branch or PR and how to refresh it.
- **Commit vendored builds.** Make sure no `.gitignore` pattern (`dist`, say) swallows them.

### Wire it in

1. **`.gitignore`:** `.env`, dependencies, build output, logs.
2. **Credentials:** read `POSTHOG_*` from `.env`, and nothing else. `bin/copy-env` syncs every
   top-level directory, so there is nothing to register.
3. **`mprocs.yaml`:** a proc with `autostart: false` in the group for its mode (`Legacy`,
   `Releaseless`, `Release env`; repros go under `Legacy`), with a short comment when the command
   needs one.
4. **Docs:** a paragraph in `README.md` saying what it proves and how to run it, and a row in the
   index above. Give it a README of its own when there is more to say: what it exercises, the local
   bits and how to refresh them, credentials, and what bites.
5. **Run it for real:** against the local PostHog, twice with the same code under two
   `APP_VERSION`s where modes are compared. Confirm the frames resolve and the release is the one
   you expect. If you could not run it, say so rather than implying it works.

## Conventions

- **Comments explain why, not what,** in full sentences, and they record the non-obvious failures
  found the hard way: the Android emulator clock, the Flutter service worker hashes, the Caddy
  `Host` header. When you hit one, write it down next to the code that works around it.
- **READMEs** lead with what the example proves, then how to run it, then what to check, then what
  bites.
- **Leave nothing behind.** Build output, dependencies, logs and `.env` are gitignored. Never put
  data dumps, exports, customer data or scratch files in this repo. Keep them outside it. Don't
  leave debug edits (stray comments, renamed functions, extra logging) in an example you only
  meant to run.
- **Don't commit or push** unless asked.
