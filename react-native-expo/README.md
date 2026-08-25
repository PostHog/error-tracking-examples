# react-native-expo

Minimal Expo app instrumented with PostHog error tracking, wired the way the
[React Native source map docs](https://posthog.com/docs/error-tracking/upload-source-maps/react-native)
describe: the metro config wraps `getPostHogExpoConfig`, and the Expo config plugin puts the upload
in the Xcode build phase. It throws through a three-deep chain (`checkout` -> `placeOrder` ->
`validateAmount`) so the minified stack only reads back if the source map landed.

The app ships two ways, and both run the whole chain end to end:

| Command | What it does |
| --- | --- |
| `pnpm ios` | Release build on the iOS simulator with the default release mode. The uploaded symbol set is bound to the release the build creates. |
| `pnpm ios:releaseless` | The same build with `releaseMode: 'event'`. Symbols upload release-independent and each exception resolves its own release. |

```bash
pnpm install
pnpm ios                 # or: pnpm ios:releaseless
../bin/check-expo        # what PostHog made of the exception
```

Each variant uses its own bundle identifier (`com.posthog.example.rnexpo` and
`…rnexpo.releaseless`), so both can sit on one simulator and each keeps its own release lineage.
Ship the same JavaScript again under a new version to see the contrast:

```bash
APP_VERSION=2.0.0 pnpm ios              # release_id_mismatch — the symbol set is taken
APP_VERSION=2.0.0 pnpm ios:releaseless  # already present, new release row, own release reported
```

`bin/run-ios` does the whole job: it loads the root `.env`, symlinks the locally built posthog-cli
where the Xcode build phase looks for it, prebuilds with the right release mode baked in, then
builds Release, installs and launches. The app captures one exception a few seconds after launch,
so a run needs nobody to tap the screen. Set `AUTO_CAPTURE=0` to drive it by hand instead.
Switching variants forces a clean prebuild; rerunning the same one reuses the pods and is much
faster.

The variant is also inlined into the bundle, and has to stay that way. A hermes chunk id is derived
from bundle content, so two variants shipping byte-identical JavaScript would land on one symbol
set and the second one built would fail with `content_hash_mismatch`.

### Why Release and not Debug

A Debug build sets `SKIP_BUNDLING`, so metro never produces a bundle and `posthog-xcode.sh`
uploads nothing. Release runs the full chain inside Xcode: metro, `hermesc`,
`compose-source-maps`, `posthog-cli hermes clone`, `posthog-cli hermes upload`, then the dSYM
upload phase. That is the only configuration where symbolication can be checked at all.

## The faster loop

`pnpm sourcemaps` and `pnpm sourcemaps:releaseless` skip Xcode entirely: `expo export` plus a
manual `hermes upload`, which is the EAS-update shaped flow. Much quicker than a native build, and
the only one of the two that covers uploading outside a native build. They upload as
`com.posthog.example.rnexpo@1.0.0+1` by default; override with `APP_ID`, `APP_VERSION`, `APP_BUILD`.

## What it exercises

- Expo 50+ stamps its own debug id during export: the `.hbc.map` carries a `debugId` field and
  nothing else identifying the chunk.
- `getPostHogExpoConfig` injects the `_posthogChunkIds` module into the bundle using that same id.
- `posthog-cli hermes upload --directory dist` must adopt the map's `debugId` as the chunk id, so
  the uploaded symbol set's ref equals Expo's debug id. This is the path that regressed once when
  the CLI's `debugId` alias was split into an explicit field, so this example is the regression
  check for it.

### What `sourcemaps:releaseless` adds

`--release-mode=event` uploads the hermes map without binding it to a release. The release row is
still created, so the server can resolve one, but nothing is stamped onto the symbol set: each
exception resolves its own release from the `$app_namespace` / `$app_version` / `$app_build` the
React Native SDK already sends. That is why the upload has to pass release coordinates matching the
app rather than letting the CLI derive them from git.

The second-release form is the case the two paths exist to contrast. A hermes chunk id is derived
from bundle content, so shipping the same JavaScript twice reuses one chunk id:

- `APP_VERSION=2.0.0 pnpm sourcemaps` fails with `release_id_mismatch`, because the stored symbol
  set already belongs to release 1.0.0.
- `APP_VERSION=2.0.0 pnpm sourcemaps:releaseless` reports `1 skipped (1 already present)` and
  creates release 2.0.0 alongside it. Exceptions from either build report their own release.

One caveat when converting an existing project: the server only ever adds a release to an orphan
symbol set, it never clears one. A symbol set uploaded before the switch keeps the release already
stamped on it, and the PostHog UI keeps showing it. React Native exceptions still resolve correctly,
because app metadata is preferred over the symbol set's release.

## What to check after a run

`../bin/check-expo` prints it for both variants:

```
  releaseless  (2026-08-24T09:35:35)
    app             : com.posthog.example.rnexpo.releaseless@1.0.0+1
    release         : com.posthog.example.rnexpo.releaseless@1.0.0+1
    symbol set      : df941dda-9c10-4ee8-9995-ade8a4312d61
    frames (in app) :
      ✓ /App.js:26 capture
      ✓ /src/checkout.js:4 checkout
      ✓ /src/order.js:3 placeOrder
      ✓ /src/amount.js:4 validateAmount
    source context of the deepest frame:
         3   export function validateAmount(amount) {
         4     if (amount <= 0) {
         5 >     throw new RangeError(`Cart total must be a positive amount, got ${amount}`)
         6     }
         7     return amount
```

Three things make that a pass:

- The frames read back to `src/*.js` rather than `main.jsbundle`, so the source map landed.
- The source context is there, which comes from `sourcesContent` in the uploaded map.
- In releaseless the symbol set carries no release of its own, so the release above it could only
  have come from the app metadata on the event.

## Local bits this depends on

- **posthog-cli** — `hermes clone`/`hermes upload --release-mode` is unreleased, so the working
  copy is used. The export-only commands reach it through `../bin/posthog-cli-local`. The native
  builds go through `../bin/install-posthog-cli-local`, which symlinks `~/.posthog/posthog-cli` at
  it, because that is the first place an Xcode build phase looks and the only one that reliably
  beats a globally installed `@posthog/cli`. It moves an existing binary aside to
  `~/.posthog/posthog-cli.bak`; delete the symlink to restore it.
- **posthog-react-native** — `vendor/posthog-react-native.tgz`, packed from a local posthog-js
  working copy, because the Expo plugin's `releaseMode` prop and the release-mode handling in
  `tooling/posthog-xcode.sh` and `tooling/posthog.gradle` are unreleased. Refresh it after changing
  that working copy:

  ```bash
  cd ~/Documents/repos/posthog-js/packages/react-native
  ./node_modules/.bin/tsc -b && ./node_modules/.bin/babel ./dist --out-dir dist --extensions '.js'
  pnpm pack --out <this-app>/vendor/posthog-react-native.tgz
  cd <this-app> && pnpm install
  ```

## How the variant reaches the build

`app.config.js` layers the variant over `app.json` from the environment, so one project builds
both modes:

| Variable | Effect |
| --- | --- |
| `APP_VARIANT` | `legacy` or `releaseless` — picks the bundle identifier suffix |
| `POSTHOG_RELEASE_MODE` | passed to the Expo plugin as `releaseMode` |
| `APP_VERSION` / `APP_BUILD` | `CFBundleShortVersionString` / `CFBundleVersion` |

`bin/run-ios` sets all four. The plugin then writes `export POSTHOG_RELEASE_MODE=event` into the
generated "Bundle React Native code and images" phase and `posthog.releaseMode=event` into
`android/gradle.properties`, and turns on the dSYM upload phase with native source included.

The version pair matters more than it looks. The release the build creates is keyed on the bundle
identifier, version and build number, and in event mode the server rebuilds that same key from the
`$app_namespace` / `$app_version` / `$app_build` on each event. If the two disagree, exceptions
report no release and nothing says so.

## Credentials

`bin/copy-env` syncs the repo root `.env` into this folder. posthog-cli reads it through the
plugin's `dotenvFile` prop, and `bin/run-ios` re-exports `POSTHOG_HOST` and `POSTHOG_KEY` as
`EXPO_PUBLIC_*` so Expo inlines them into the bundle — React Native cannot read a `.env` at
runtime, and nothing has to be edited by hand.

## The debug build

`pnpm start:ios` launches a Debug build against a metro dev server. Useful for iterating on the UI,
but it exercises no symbolication, because a Debug build never bundles.

Metro runs on port 8083 because 8081 is commonly taken (OrbStack). `expo run:ios --port` starts
Metro there but does not bake the port into an already-prebuilt native project, so the app probes
8081 and dies with "No script URL provided". Fix once per simulator, no rebuild needed:

```bash
xcrun simctl spawn booted defaults write com.posthog.example.rnexpo RCT_jsLocation "localhost:8083"
```
