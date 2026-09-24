# error-tracking-examples

Small apps that exercise PostHog error tracking end to end against a local
PostHog, one per SDK/tooling combination. Each one builds, uploads its symbols,
runs and captures an exception, so one command shows whether the whole chain
works.

```bash
mprocs --config mprocs.yaml
```

`env-setup` runs on launch and syncs credentials into every project; every other
proc is off by default, so start the one you want from the sidebar. Procs are
grouped by how the release is associated with exceptions:

- **Legacy** — the release the upload creates is stamped onto the uploaded
  symbol set, and an exception inherits the release of the symbol sets its
  frames resolved against.
- **Releaseless** — `--release-mode=event`. Symbol sets are uploaded
  release-independent and each event resolves its own release, from an id the
  upload injected into the build output.
- **Release env** — nothing is injected: the release is resolved before launch
  and handed to the SDK in `POSTHOG_RELEASE_ID`.

A few examples reproduce a specific bug rather than a flow; they sit under
Legacy and say so below.

Everything targets the local PostHog until you switch. To run the same examples
against a PostHog cloud project, fill in `.env.prod` (`bin/use-prod` writes the
template the first time), then run `bin/use-prod`, or start `env-use-prod` from
the sidebar. `bin/use-local` switches back. [AGENTS.md](AGENTS.md#switching-between-local-and-prod)
has the details, including the few examples that stay local regardless.

[AGENTS.md](AGENTS.md) has an index of every example, where the credentials come
from, and the conventions for adding a new one.

## Android

`android-legacy` and `android-releaseless` are the same app twice, differing
only in `posthog.releaseMode` (and in applicationId, so both can sit on one
device and each gets its own release and mapping). Tap **Capture exception** in
the app to report a handled exception; its stack trace is obfuscated by R8, so
it only reads back once PostHog applies the mapping the build uploaded.

Both build against a local working copy of **posthog-android** and its gradle
plugin, published to `~/.m2` (`bin/publish-posthog-local`), because
`posthog.releaseMode` has not shipped in a release yet.

The mapping upload itself uses the published CLI, which the gradle plugin looks
up on PATH — install it once with `npm install -g @posthog/cli` (0.13.0 or
newer, where `proguard upload --release-mode` landed).

The mapping upload is forced on every run (`--rerun`). Gradle would otherwise
skip it silently when the mapping has not changed, and `1 skipped (1 already
present)` is exactly the result worth seeing: it means two builds produced the
same content-addressed map id.

posthog-android is republished on every run. Once it is current that is most of the
runtime, so `POSTHOG_SKIP_DEPS=1` skips it.

```bash
bin/android-run android-legacy          # build, install, launch, stream logs
bin/android-run android-legacy 2.0.0    # ship the same code as a second release
POSTHOG_SKIP_DEPS=1 bin/android-run android-releaseless
```

The second-release form is the case the two examples exist to contrast: the code
— and therefore the content-addressed map id — is identical across the two
releases, so in legacy mode both resolve to whichever release uploaded the
mapping first, and in event mode each reports its own.

The app is pointed at `POSTHOG_HOST` verbatim and reaches it over an
`adb reverse` on that port, not over the emulator's `10.0.2.2` alias. That alias
reaches the host fine, but puts `10.0.2.2` in the `Host` header, and PostHog's
local Caddy serves only its `localhost` site — everything else gets an empty
`200` that the SDK reports as a successful send while nothing is ingested.

An emulator is cold booted automatically when no device is attached. Override
the AVD with `ANDROID_AVD`, and the posthog-android checkout with
`POSTHOG_ANDROID_REPO`.

Cold, not resumed, on purpose: a snapshot resume restores the OS network-time
clock from whenever the snapshot was taken, while the host only corrects the
wall clock. The SDK timestamps events off the network clock, so events land
weeks in the past and never appear in the dashboard's date range — which looks
exactly like they were dropped. The apps also pin `dateProvider` to the device
clock, so an emulator that was already up when you started does not hit this.

## React Native

`react-native-expo` is one Expo app that builds two ways, differing only in release mode. Both run
the whole chain on the iOS simulator: metro, hermesc, compose-source-maps, `posthog-cli hermes
clone` and `upload`, the dSYM upload phase, then install and launch. The app captures one exception
a few seconds after launch, so a run needs nobody to tap the screen.

```bash
cd react-native-expo
pnpm ios                 # legacy: the symbol set is bound to the release
pnpm ios:releaseless     # event mode: symbols upload release-independent
cd .. && bin/check-expo  # frames, release and source context for both
```

Each variant has its own bundle identifier, so both can sit on one simulator. Ship the same
JavaScript again under a new version to see why event mode exists:

```bash
APP_VERSION=2.0.0 pnpm ios              # release_id_mismatch — the symbol set is taken
APP_VERSION=2.0.0 pnpm ios:releaseless  # already present, new release row, own release reported
```

`pnpm sourcemaps` and `pnpm sourcemaps:releaseless` are the faster loop: `expo export` plus a
manual `hermes upload`, no Xcode, which is the EAS-update shaped flow.

Both paths run a locally built posthog-cli, and the app depends on a vendored posthog-react-native,
because neither `hermes clone --release-mode` nor the Expo plugin's `releaseMode` prop has shipped.
The native builds symlink `~/.posthog/posthog-cli` at the local build, since that is where an Xcode
build phase looks first. See [react-native-expo/README.md](react-native-expo/README.md).

## iOS

`ios-raw` is a plain Xcode project with no proc — open it in Xcode. It builds against the
posthog-ios checkout next to this repo (`../posthog-ios`) as a local Swift package.

## Rust

`rust-raw` and `rust-releaseless` are the same tiny cargo binary twice, differing only in how the
release is associated — the rust counterpart of the android and expo pairs. Rust has no source
maps: the release build keeps its DWARF (`debug = "line-tables-only"` in `Cargo.toml`, split into
a `.dSYM` on macOS), `posthog-cli symbol-sets upload` uploads it keyed by the binary's Mach-O UUID
(GNU build id on Linux), and the SDK reports that same id in `$debug_images` next to raw
instruction addresses, so the frames are symbolicated server-side against the upload.

```bash
rust-raw/run                     # legacy: the symbol set is bound to the release
rust-releaseless/run             # event mode: symbols upload release-independent
APP_VERSION=2.0.0 rust-raw/run          # ship the same binary as a second release
APP_VERSION=2.0.0 rust-releaseless/run  # (the case the two exist to contrast)
bin/check-rust                   # frames, release and app for both, server-side
```

### How a Rust build reports its release

The JS examples inject `$release_id` into the bundle; the mobile ones rely on the `$app_*`
properties the SDK reads off the running app. A compiled Rust binary has neither, so `posthog-rs`
compiles a fixed placeholder into it — a 59-byte marker, `~posthog-release-id~v1~` followed by a
nil UUID — and `posthog-cli symbol-sets upload --release-mode=event` creates the release, then
overwrites that placeholder in the built binary with the release's id. The SDK reads the marker
back at runtime and reports it as `$release_id` on every event, the primary key cymbal resolves an
exception's release from. The debug symbols upload release-independent, with the marker reset to
its placeholder in the uploaded copy, so an unchanged binary keeps one symbol set across releases.
Because one id is copied into both the release row and the binary, the release's name and version
are only labels: nothing the app reports has to match them.

Nothing in `rust-releaseless/src/main.rs` names the release. It only prints what the SDK will
report, through `injected_release_id()`:

```rust
match posthog_rs::injected_release_id() {
    Some(release) => println!("starting — injected release {release}"),
    None => println!("starting — no release injected (run through ./run)"),
}
```

On macOS the overwrite invalidates the binary's ad-hoc code signature, so the CLI re-signs it
ad-hoc after injecting (`--no-resign` skips that, for pipelines that sign afterwards). On Linux
nothing is signed, but the marker lives in the same ELF the CLI uploads as the debug symbols,
which is why the uploaded copy carries the placeholder.

### The two examples

`rust-raw` is the fully-published path: the published `posthog-rs` and the published `@posthog/cli`
(0.8.1+, where `symbol-sets upload` learned `.dSYM` bundles), nothing built locally. It uploads
with the symbol set **bound** to the release (`--release-name`/`--release-version` from the crate,
plus git metadata), the previous behavior. Its binary carries no marker (`posthog-rs` 0.25 predates
it), so its app metadata is backfilled from the release cymbal resolves through the symbol-set
binding.

`rust-releaseless` runs the working copy of `posthog-cli` through `bin/posthog-cli-local` (because
`symbol-sets upload --release-mode` is unreleased) and builds against the working copy of
`posthog-rs` (because the release marker and `injected_release_id()` are unreleased). Its upload
is `--release-mode=event`: the symbol set is content-addressed and release-independent, and each
exception carries its own release in the injected `$release_id`.

Ship the same code again under a new version to see why event mode exists. `APP_VERSION` only
changes the release the upload creates, so cargo does not rebuild and the build id — hence the
symbol set — is unchanged:

- `APP_VERSION=2.0.0 rust-raw/run` warns `release_id_mismatch`: the symbol set is already bound to
  `1.0.0`, so the `2.0.0` exception still reports `rust-raw@1.0.0`.
- `APP_VERSION=2.0.0 rust-releaseless/run` reports `1 skipped (1 already present)`, mints a new
  release row, re-injects that release's id into the same binary, and the `2.0.0` exception
  reports `rust-releaseless@2.0.0` off the same symbol set.

`bin/check-rust` prints the app, the `$release_id`, the resolved release, the debug image ids and
the symbolicated in-app frames for the most recent occurrence of each — the whole chain end to
end.

`rust-release-env` is the third way: symbols upload release-independent as in `rust-releaseless`,
but nothing is written into the binary. See [Release id from the environment](#release-id-from-the-environment).

## Release id from the environment

`rust-release-env`, `python-release-env`, `ruby-release-env` and `php-release-env` are one flow in
four SDKs. `./run` resolves the release with `posthog-cli release resolve`, which creates it on
first use and prints only its id, exports that id as `POSTHOG_RELEASE_ID` and launches the app. The
SDK reads it when the client is created and reports it as `$release_id` on every event, not only on
exceptions. Nothing in the app names the release, and running it directly rather than through
`./run` reports none.

```bash
rust-release-env/run                     # or python-release-env/run, ruby-…, php-…
APP_VERSION=2.0.0 rust-release-env/run   # the same code as a second release
```

Only the Rust one uploads symbols (`symbol-sets upload --release-mode=event`, as in
`rust-releaseless`). Python, Ruby and PHP frames carry their own source context, so there is nothing
to upload.

All four run the working copy of posthog-cli through `bin/posthog-cli-local`, and build against a
working copy of their SDK in a sibling checkout, because reading `POSTHOG_RELEASE_ID` has not
shipped: `../posthog-rs` as a cargo path dependency, and a wheel, a gem and a composer path
repository built from `../posthog-python`, `../posthog-ruby` and `../posthog-php`
(`POSTHOG_PYTHON_REPO` and `POSTHOG_RUBY_REPO` override the first two). Those three build a real
package on every run instead of linking the checkout, so a run also proves the change ships in it.
They need `uv`, `ruby` and `composer` respectively.

The upload has to come from the very build that runs, since every build gets a new UUID. The CLI
walks all of `target/release`, `deps/` and `build/` included, so it warns once per build script and
proc-macro dylib that carries no debug info — noise, not a problem; the line to look for is
`Processing dSYM ... (UUIDs: ...)`. Both runs use `--include-source`, so the frames get source
context in the UI; that bundles every file the DWARF references — std and registry sources
included, ~1250 files (30 MB) — and warns once per `/rustc/...` path that is not on disk (the std
sources, unless `rustup component add rust-src`). `run` finds cargo under `~/.cargo/bin` or
homebrew's rustup directory when it is not on PATH.

## Flutter

`flutter-web-legacy` and `flutter-web-releaseless` are the same Flutter web app twice, differing
only in the release mode their upload runs in. Both build with `flutter build web --source-maps`,
upload with `posthog-cli sourcemap process`, and serve `build/web` on a static server. The app
throws one uncaught exception two seconds after the page loads, so a run needs nobody to click
anything; the button throws another.

```bash
flutter-web-legacy/run                     # legacy: the symbol set is bound to the release
flutter-web-releaseless/run                # event mode: symbols upload release-independent
APP_VERSION=2.0.0 flutter-web-legacy/run          # ship the same code as a second release
APP_VERSION=2.0.0 flutter-web-releaseless/run     # (the case the two exist to contrast)
bin/check-flutter                          # release and symbolicated frames for both
```

Neither one builds anything locally: both use the published `posthog_flutter` and the published
`posthog-cli`. Flutter web already reports the injected release id, because the plugin hands the
exception to the posthog-js instance the page started, and posthog-js reads `_posthogReleaseId`
off the global. Nothing in the Dart code names a release.

### The two examples

`flutter build web` emits one sourcemapped chunk, `main.dart.js`. An app that uses deferred
loading gets one more per deferred library (`main.dart.js_1.part.js`), and the two modes differ
the same way for each of them.

Ship the same code again under a new version to see why event mode exists. `APP_VERSION` only
changes the release the upload creates, and the app reads its release label off the page rather
than from a `--dart-define`, so the Dart build is unchanged between the two runs:

- `APP_VERSION=2.0.0 flutter-web-legacy/run` reports `1 chunk(s) uploaded`. Legacy mints a fresh
  random chunk id whenever the release changes, so the second release gets a symbol set of its
  own holding the same bytes as the first.
- `APP_VERSION=2.0.0 flutter-web-releaseless/run` reports `1 skipped (1 already present)`. The
  chunk id comes from the content, so the sourcemap is unchanged and the stored symbol set is
  reused; the new release's id goes into `main.dart.js`, and the exception reports
  `flutter-web-releaseless@2.0.0` off that one symbol set.

### Two things that bite

Both `run` scripts pass `--pwa-strategy=none`. `flutter build web` otherwise writes
`flutter_service_worker.js` holding an MD5 of every file, taken before `posthog-cli sourcemap
inject` rewrites `main.dart.js`. Nothing fails — the service worker never verifies those hashes —
but it caches `main.dart.js`, and on a rebuild whose Dart code did not change it sees an unchanged
manifest and keeps serving the copy it already has. The page then reports the previous build's
chunk id and release id against symbol sets the CLI has replaced.

`flutter build web --source-maps` writes no `sourcesContent`. Frames read back with their Dart
names and file positions, but the UI has no source lines to show under them.

## Node

`node-raw`, `node-rollup` and `node-webpack` are one three-file app built three ways: esbuild plus
a bare `posthog-cli sourcemap process` with no bundler plugin, `@posthog/rollup-plugin`, and
`@posthog/webpack-plugin`, which splits the throwing module into a chunk of its own so one stack
resolves across two symbol sets. `next-webpack` is a Next.js app router app built through
`@posthog/nextjs-config`; its run starts the server and probes a route that throws server-side.
Every one of them has `pnpm start` (legacy) and `pnpm start:releaseless`, runs headless and exits.

```bash
cd node-raw && pnpm start               # legacy
cd node-raw && pnpm start:releaseless   # event mode
```

`node-raw` uses only published packages. The other three consume plugin and SDK builds packed from
posthog-js branches into `vendor/*.tgz`; their READMEs name the branch and how to repack it.

`node-legacy-sdk` is `node-raw` uploaded with `--release-mode=event`, against the last posthog-node
that predates `$release_id` (5.46.1, pinned to `@posthog/core` 1.45.1 — the caret range otherwise
pulls a core that already reports the injected id). The symbol sets carry no release and the SDK
reports none, so the exception resolves to no release at all, and the UI shows a banner asking you
to update the SDK.

```bash
cd node-raw && pnpm start:releaseless   # event mode, current SDK: the release resolves
cd node-legacy-sdk && pnpm start        # event mode, SDK too old to report it: no release
```

The exception message differs from `node-raw`, so the two land in their own issues and can be
compared side by side.

## Nuxt

`nuxt-spa` is a client-only Nuxt 4 app (`ssr: false`) built with `@posthog/nuxt`, reproducing
[PostHog/posthog-js#4779](https://github.com/PostHog/posthog-js/pull/4779): Nitro still writes a
server bundle for the API routes, the published module never injects it and then uploads the whole
output directory, so the CLI fails on the first uninjected server chunk, the module catches the
error, the build stays green, and server exceptions keep their bundle paths. The same upload
carries no release flags, so it resolves a release derived from the git checkout next to the
configured one. Each run builds, triggers one server and one client exception headlessly, and
reads back from PostHog what each resolved to:

```bash
cd nuxt-spa
pnpm start              # published 1.7.87: server not symbolicated, client symbolicated
pnpm start:keep         # same with deleteAfterUpload: false: neither is symbolicated
pnpm start:fixed        # the PR branch, packed into vendor/: both symbolicated
pnpm start:fixed:keep   # the PR branch with deleteAfterUpload: false: both symbolicated
```

The PR build is installed under the alias `@posthog/nuxt-pr4779` next to the published module,
so the two share one `node_modules`. See its README for why every run gets its own output
directory and port.

## Web

`web-raw` is `node-raw` in the browser: esbuild with code splitting, a bare `posthog-cli sourcemap
process`, then a static server on http://localhost:8080. Open the page to capture the exception.
It runs a posthog-js build vendored into `vendor/posthog-js`.

`web-vite-sri3` reproduces a customer-reported incompatibility between `@posthog/rollup-plugin` and
`vite-plugin-sri3`: the SRI hashes are computed before the plugin rewrites the bundles, so the
browser blocks every script. `pnpm start` prints the hash mismatches and serves the blank page, by
design. See its README.

`web-angular-sw` is an Angular 22 app with `@angular/service-worker`, reproducing
[PostHog/posthog#86046](https://github.com/PostHog/posthog/issues/86046): `ng build` records a
SHA-1 of every bundle in `ngsw.json`, `posthog-cli sourcemap inject` then rewrites the bundles, and
the service worker rejects the new version and keeps serving the cached one. `pnpm start` proves
both halves — `verify:broken` expects the `main-*.js` hash to mismatch after inject, `verify:fixed`
expects every hash to match after `ngsw-config` regenerates the manifest — and `pnpm test:browser`
replays the failure and the fix in headless Chrome. See its README for the details.

`web-webpack-sml` reproduces
[PostHog/posthog-js#4724](https://github.com/PostHog/posthog-js/issues/4724): a webpack 5 build
with `source-map-loader` (the create-react-app setup) prints 126 "Failed to parse source map"
warnings, because posthog-js 1.421.1+ ships maps without `sourcesContent` whose `sources` point at
files the published package does not contain. `pnpm build` shows the warnings against the pinned
current release; `pnpm build:before` aliases the same build to 1.421.0 — the last release with
`sourcesContent`, found by bisecting — and is clean. Build-time only, no credentials needed. See
its README for what each build leaves in the consumer's own output map.
