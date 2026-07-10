# iOS white-label apps

Same app shipped under many bundle IDs, one per brand. Every brand pipeline builds the same code, so every build produces the same dSYM (same UUIDs).

The rule: **one PostHog project, and every build uploads its dSYM under the same release name** (product + version - never a bundle ID). Duplicate uploads are no-ops, so parallel pipelines need no coordination or upload order. Naming releases after bundle IDs is what causes `release_id_mismatch` errors.

Exceptions from all brands group into one issue, because fingerprints hash the symbolicated stack frames, not the bundle ID. Break down by `$app_namespace` to split per brand.

## Run

```bash
export POSTHOG_CLI_PROJECT_ID=12345
export POSTHOG_CLI_API_KEY=phx_...   # personal API key, not the project token

./build.sh phc_PROJECT_TOKEN https://us.posthog.com
```

Token and host can also live in `Whitelabel/Info.plist` (`PostHogProjectToken`, `PostHogHost`) - then run `./build.sh` with no args.

The script builds the app twice (once per brand), prints the identical dSYM UUIDs, uploads both dSYMs in parallel under release `ios-whitelabel-demo@1.0+1`, and installs both apps on a simulator. Then run them:

```bash
xcrun simctl launch <udid> com.posthog.whitelabel.red    # app A
xcrun simctl launch <udid> com.posthog.whitelabel.blue   # app B
```

Tap **Capture handled exception** in each app: one issue in Error tracking, with events from both bundle IDs and symbolicated stacks including source lines.
