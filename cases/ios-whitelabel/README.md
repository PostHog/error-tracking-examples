# iOS white-label apps

Same app shipped under many bundle IDs, one per brand. Every brand pipeline builds the same code, so every build produces the same dSYM (same UUIDs).

The rule: **one PostHog project, and every build uploads its dSYM under the same release name** (product + version - never a bundle ID). Duplicate uploads are no-ops, so parallel pipelines need no coordination or upload order. Naming releases after bundle IDs is what causes `release_id_mismatch` errors.

Exceptions from all brands group into one issue, because fingerprints hash the symbolicated stack frames, not the bundle ID. Break down by `$app_namespace` to split per brand.

## How the upload works

There is no custom upload command. The dSYM is uploaded from the SDK's bundled build phase, the same as any app that ships with PostHog error tracking. The target has an **Upload dSYMs to PostHog** run-script phase that calls:

```sh
POSTHOG_INCLUDE_SOURCE=1 PRODUCT_BUNDLE_IDENTIFIER="ios-whitelabel-demo" \
  "${BUILD_DIR%/Build/*}/SourcePackages/checkouts/posthog-ios/build-tools/upload-symbols.sh"
```

The only white-label-specific part is the `PRODUCT_BUNDLE_IDENTIFIER` override. The SDK script uses that build setting as the `--release-name`; left alone it would be the per-brand bundle id (the `release_id_mismatch` trap). Overriding it with a product-level constant makes every brand upload under one release. `MARKETING_VERSION` (`1.0`) and `CURRENT_PROJECT_VERSION` (`1`) come straight from the build settings, so the release is `ios-whitelabel-demo@1.0+1` for every brand. The override only changes the upload's release name, not the built app.

Required build settings (already set on the target): `DEBUG_INFORMATION_FORMAT = dwarf-with-dsym` and `ENABLE_USER_SCRIPT_SANDBOXING = NO` (the script traverses dSYM bundles). The phase runs on Release builds only and skips itself when `POSTHOG_CLI_API_KEY` is unset.

> Overriding `PRODUCT_BUNDLE_IDENTIFIER` is the only lever the current SDK script exposes for the release name - a dedicated env var would be cleaner. Worth raising against `posthog-ios`.

## Run

```bash
export POSTHOG_CLI_PROJECT_ID=12345
export POSTHOG_CLI_API_KEY=phx_...   # personal API key, not the project token

./build.sh phc_PROJECT_TOKEN https://us.posthog.com
```

Token and host can also live in `Whitelabel/Info.plist` (`PostHogProjectToken`, `PostHogHost`) - then run `./build.sh` with no args.

`build.sh` is just a demo harness for two brands: it builds the app twice (once per brand) and installs both on a simulator. Each build's own build phase uploads its dSYM under release `ios-whitelabel-demo@1.0+1` - the first attaches the symbol set, the second is a no-op. The script prints the identical dSYM UUIDs so you can see they match. Then run them:

```bash
xcrun simctl launch <udid> com.posthog.whitelabel.red    # app A
xcrun simctl launch <udid> com.posthog.whitelabel.blue   # app B
```

Tap **Capture handled exception** in each app: one issue in Error tracking, with events from both bundle IDs and symbolicated stacks including source lines.
