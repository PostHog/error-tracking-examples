# react-native-expo

Minimal Expo app instrumented with PostHog error tracking, following the simplest path from the
[React Native source map docs](https://posthog.com/docs/error-tracking/upload-source-maps/react-native):
the metro config wraps `getPostHogExpoConfig`, and the manual (EAS-update style) upload command
sends the exported hermes maps to a local PostHog with the locally built posthog-cli.

```bash
pnpm install
pnpm sourcemaps    # clean + expo export --source-maps --platform ios + posthog-cli hermes upload
```

## What it exercises

- Expo 50+ stamps its own debug id during export: the `.hbc.map` carries a `debugId` field and
  nothing else identifying the chunk.
- `getPostHogExpoConfig` injects the `_posthogChunkIds` module into the bundle using that same id.
- `posthog-cli hermes upload --directory dist` must adopt the map's `debugId` as the chunk id, so
  the uploaded symbol set's ref equals Expo's debug id. This is the path that regressed once when
  the CLI's `debugId` alias was split into an explicit field, so this example is the regression
  check for it.

## What to check after `pnpm sourcemaps`

- The upload logs `Found 1 maps to upload` and `1 chunk(s) uploaded`.
- The symbol set ref equals the map's debug id:

```bash
node -e "console.log(JSON.parse(require('fs').readFileSync(require('glob').sync('dist/_expo/static/js/ios/*.hbc.map')[0])).debugId)" 2>/dev/null \
  || python3 -c "import json,glob; print(json.load(open(glob.glob('dist/_expo/static/js/ios/*.hbc.map')[0]))['debugId'])"
```

Compare against the ref shown under error tracking symbol sets in the PostHog UI (or
`GET /api/environments/1/error_tracking/symbol_sets/?search=<id>`).

## Credentials

`bin/copy-env` syncs the repo root `.env` into this folder; `pnpm upload` reads
`POSTHOG_CLI_TOKEN` / `POSTHOG_CLI_ENV_ID` / `POSTHOG_CLI_HOST` from the environment the same way
the other examples do. The runtime key in `App.js` is inlined (React Native cannot read `.env`) —
update it from the root `.env` before running the app.

## Running the app

The default proc only covers the build-and-upload half, which is the part the CLI touches.

`pnpm start:ios` (or the `react-native-expo (ios app)` proc) prebuilds and launches a debug build
on the iOS simulator. Tap **Capture exception** to see an event arrive - but the dev bundle has no
injected ids, so it does not exercise symbolication. Update `POSTHOG_KEY` in `App.js` to your local
project token (root `.env`) first, or capture drops the events.

Metro runs on port 8083 because 8081 is commonly taken (OrbStack). `expo run:ios --port` starts
Metro there but does not bake the port into an already-prebuilt native project, so the app probes
8081 and dies with "No script URL provided". Fix once per simulator, no rebuild needed:

```bash
xcrun simctl spawn booted defaults write com.posthog.example.rnexpo RCT_jsLocation "localhost:8083"
```

then relaunch the app. `ios/.xcode.env.local` also carries `RCT_METRO_PORT=8083` for future
builds, but that file is generated - re-add the line after `expo prebuild --clean`.

Full on-device symbolication needs a release build whose Xcode build phase does the upload (the
`posthog-react-native/expo` plugin + prebuild flow from the docs) - the same treatment the android
examples got. Not wired here yet.
