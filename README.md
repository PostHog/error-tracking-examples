# error-tracking-examples

Small apps that exercise PostHog error tracking end to end against a local
PostHog, one per SDK/tooling combination.

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
  release-independent and each event resolves its own release.

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

`ios-raw` is a plain Xcode project with no proc — open it in Xcode.

## Rust

`rust-raw` is a plain cargo binary on the published `posthog-rs`, with the published `posthog-cli`
doing the upload — nothing built locally, so it needs only `@posthog/cli` (0.8.1 or newer, where
`symbol-sets upload` learned `.dSYM` bundles) and a Rust toolchain. Rust has no source maps: the
release build keeps its DWARF (`debug = "line-tables-only"` in `Cargo.toml`, split into a `.dSYM`
on macOS), the CLI uploads it keyed by the binary's Mach-O UUID (GNU build id on Linux), and the
SDK reports that same id in `$debug_images` next to raw instruction addresses, so the frames are
symbolicated server-side against the upload.

```bash
rust-raw/run    # cargo build --release, symbol-sets upload, run the binary
```

The upload has to come from the very build that runs, since every build gets a new UUID. A rerun
without code changes is a no-op for cargo and comes back `1 skipped (1 already present)` from the
upload, which is the healthy signal. The CLI walks all of `target/release`, `deps/` and `build/`
included, so it also warns once per build script and proc-macro dylib that it found no debug info
in — noise, not a problem; the line to look for is `Processing dSYM ... (UUIDs: ...)`. `run`
finds cargo under `~/.cargo/bin` or homebrew's rustup directory when it is not on PATH.

Legacy only: `symbol-sets upload` has no `--release-mode` in a published CLI yet. The release is
derived from git the same way the sourcemap examples do it. The upload runs with
`--include-source`, so the frames get source context in the UI; that bundles every file the DWARF
references — std and registry sources included, ~1250 files (30 MB) — and warns once per
`/rustc/...` path that is not on disk (the std sources, unless `rustup component add rust-src`).
