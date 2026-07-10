#!/usr/bin/env bash
#
# Builds the same app once per brand (like separate CI pipelines). Every build
# produces the same mapping file (same map id), and the PostHog Gradle plugin
# uploads it under ONE shared release name (never an applicationId - see
# app/build.gradle.kts). Duplicate uploads are no-ops, so the pipelines need
# no coordination. Finally installs both apps on an emulator.
#
# Usage: ./build.sh [phc_PROJECT_TOKEN] [host]
#   Defaults come from posthogToken / posthogHost in gradle.properties.
#   Upload needs POSTHOG_CLI_PROJECT_ID + POSTHOG_CLI_API_KEY (skipped otherwise).

set -euo pipefail
cd "$(dirname "$0")"

prop() { sed -n "s/^$1=//p" gradle.properties; }
TOKEN="${1:-$(prop posthogToken)}"
HOST="${2:-$(prop posthogHost)}"
BRANDS=(red blue)
export ANDROID_HOME="${ANDROID_HOME:-$HOME/Library/Android/sdk}"
ADB="$ANDROID_HOME/platform-tools/adb"

mkdir -p dist
for slug in "${BRANDS[@]}"; do
  echo "== Build brand '$slug'"
  # Fresh full build each time (.gradle included, or Gradle's task history
  # marks the upload up-to-date and skips it). The brand changes only the
  # applicationId, so every build produces the same mapping file and the same
  # map id - as on CI pipelines building each brand from the same code. The
  # plugin uploads the mapping during the build, under the shared release name.
  rm -rf app/build .gradle
  ./gradlew --quiet assembleRelease -Pbrand="$slug" \
    -PposthogToken="$TOKEN" -PposthogHost="$HOST" \
    -PposthogCliProjectId="${POSTHOG_CLI_PROJECT_ID:-}" \
    -PposthogCliApiKey="${POSTHOG_CLI_API_KEY:-}" \
    -PposthogCliHost="${POSTHOG_CLI_HOST:-$HOST}" \
    ${POSTHOG_CLI_BIN:+-PposthogCliBin="$POSTHOG_CLI_BIN"}

  cp app/build/outputs/apk/release/app-release.apk "dist/whitelabel-$slug.apk"
  map_id=$(unzip -p "dist/whitelabel-$slug.apk" assets/posthog-meta.properties |
    sed -n 's/^io.posthog.proguard.mapid=//p')
  echo "  map id: $map_id"
done

if [[ -z "${POSTHOG_CLI_API_KEY:-}" || -z "${POSTHOG_CLI_PROJECT_ID:-}" ]]; then
  echo "== Upload was skipped - set POSTHOG_CLI_PROJECT_ID and POSTHOG_CLI_API_KEY"
fi

echo "== Install both apps"
if ! "$ADB" devices | grep -q "device$"; then
  AVD=$("$ANDROID_HOME/emulator/emulator" -list-avds 2>/dev/null | grep -v ' ' | head -1)
  [[ -n "$AVD" ]] || { echo "No Android emulator AVD found" >&2; exit 1; }
  nohup "$ANDROID_HOME/emulator/emulator" -avd "$AVD" >/dev/null 2>&1 &
  "$ADB" wait-for-device
fi
until [[ "$("$ADB" shell getprop sys.boot_completed 2>/dev/null | tr -d '\r')" == "1" ]]; do sleep 2; done
# When pointing at a local PostHog, forward the port so the app can use plain
# localhost - services behind the dev proxy match on the Host header.
if [[ "$HOST" =~ ^https?://(localhost|127\.0\.0\.1):([0-9]+) ]]; then
  "$ADB" reverse "tcp:${BASH_REMATCH[2]}" "tcp:${BASH_REMATCH[2]}"
fi
for slug in "${BRANDS[@]}"; do
  "$ADB" install -r "dist/whitelabel-$slug.apk" >/dev/null
done

echo
echo "Run app A (red):  adb shell am start -n com.posthog.whitelabel.red/com.posthog.whitelabel.MainActivity"
echo "Run app B (blue): adb shell am start -n com.posthog.whitelabel.blue/com.posthog.whitelabel.MainActivity"
echo "Tap 'Capture handled exception' in each - both land in ONE PostHog issue."
