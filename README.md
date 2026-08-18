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

Both build against local working copies, because neither
`posthog.releaseMode` nor `proguard upload --release-mode` has shipped in a
release yet:

- **posthog-cli** from `../posthog/cli/target/release` (`bin/build-cli`)
- **posthog-android** and its gradle plugin, published to `~/.m2`
  (`bin/publish-posthog-local`)

Both are rebuilt on every run. Once they are current that is most of the
runtime, so `POSTHOG_SKIP_DEPS=1` skips them.

```bash
bin/android-run android-legacy          # build, install, launch, stream logs
bin/android-run android-legacy 2.0.0    # ship the same code as a second release
POSTHOG_SKIP_DEPS=1 bin/android-run android-releaseless
```

The second-release form is the case the two examples exist to contrast: the code
— and therefore the content-addressed map id — is identical across the two
releases, so in legacy mode both resolve to whichever release uploaded the
mapping first, and in event mode each reports its own.

An emulator is cold booted automatically when no device is attached. Override
the AVD with `ANDROID_AVD`, and the repo locations with `POSTHOG_REPO` /
`POSTHOG_ANDROID_REPO`.

Cold, not resumed, on purpose: a snapshot resume restores the OS network-time
clock from whenever the snapshot was taken, while the host only corrects the
wall clock. The SDK timestamps events off the network clock, so events land
weeks in the past and never appear in the dashboard's date range — which looks
exactly like they were dropped. The apps also pin `dateProvider` to the device
clock, so an emulator that was already up when you started does not hit this.

## iOS

`ios-raw` is a plain Xcode project with no proc — open it in Xcode.
