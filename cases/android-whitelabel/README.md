# Android white-label apps

Same app shipped under many applicationIds, one per brand. Every brand pipeline builds the same code, so every build produces the same R8 mapping file - and the [PostHog Android Gradle plugin](https://github.com/PostHog/posthog-android/tree/main/posthog-android-gradle-plugin) derives the same map id from it.

The rule: **one PostHog project, and every build uploads its mapping under the same release name** (product + version - never an applicationId). Duplicate uploads are no-ops, so parallel pipelines need no coordination or upload order. Naming releases after applicationIds is what causes `release_id_mismatch` errors.

The plugin's upload task defaults the release name to the applicationId - exactly that collision. Override it in `app/build.gradle.kts` (the `afterEvaluate` wrapper is required, because the plugin sets its default after the script body runs):

```kotlin
afterEvaluate {
    tasks.withType<PostHogUploadProguardMappingsTask>().configureEach {
        releaseName.set("android-whitelabel-demo")
        releaseVersion.set("1.0")
        build.set(1)
    }
}
```

Exceptions from all brands group into one issue, because fingerprints hash the deobfuscated stack frames, not the applicationId. Break down by `$app_namespace` to split per brand.

## Run

```bash
export POSTHOG_CLI_PROJECT_ID=12345
export POSTHOG_CLI_API_KEY=phx_...   # personal API key, not the project token

./build.sh phc_PROJECT_TOKEN https://us.posthog.com
```

Token and host can also live in `gradle.properties` (`posthogToken`, `posthogHost`) - then run `./build.sh` with no args.

The script builds the app twice (once per brand), prints the identical map ids, lets the Gradle plugin upload each build's mapping under release `android-whitelabel-demo@1.0+1`, and installs both apps on an emulator. Then run them:

```bash
adb shell am start -n com.posthog.whitelabel.red/com.posthog.whitelabel.MainActivity    # app A
adb shell am start -n com.posthog.whitelabel.blue/com.posthog.whitelabel.MainActivity   # app B
```

Tap **Capture handled exception** in each app: one issue in Error tracking, with events from both applicationIds and deobfuscated stacks.
