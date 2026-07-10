#!/usr/bin/env bash
#
# Builds the same app once per brand (like separate CI pipelines), shows the
# builds share identical dSYM UUIDs, uploads each build's dSYM in parallel
# under ONE shared release name (never a bundle ID), and installs both apps.
# Duplicate uploads are no-ops, so the pipelines need no coordination.
#
# Usage: ./build.sh [phc_PROJECT_TOKEN] [host]
#   Defaults come from PostHogProjectToken / PostHogHost in Whitelabel/Info.plist.
#   Upload needs POSTHOG_CLI_PROJECT_ID + POSTHOG_CLI_API_KEY (skipped otherwise).

set -euo pipefail
cd "$(dirname "$0")"

TOKEN="${1:-$(/usr/libexec/PlistBuddy -c 'Print :PostHogProjectToken' Whitelabel/Info.plist)}"
HOST="${2:-$(/usr/libexec/PlistBuddy -c 'Print :PostHogHost' Whitelabel/Info.plist)}"
CLI="${POSTHOG_CLI_BIN:-posthog-cli}"
RELEASE=(--release-name ios-whitelabel-demo --release-version 1.0 --build 1)
BRANDS=("red|Acme Red|#F54E00" "blue|Acme Blue|#1D4AFF")
PRODUCTS="build/derived/Build/Products/Release-iphonesimulator"
uuid_set() { dwarfdump --uuid "$1" | awk '{print $2}' | sort | paste -sd' ' -; }

UDID=$(xcrun simctl list devices booted | grep -m1 -oE '[0-9A-F-]{36}' || true)
[[ -n "$UDID" ]] || UDID=$(xcrun simctl list devices available | grep iPhone | grep -m1 -oE '[0-9A-F-]{36}') ||
  { echo "No iPhone simulator found" >&2; exit 1; }

mkdir -p build
for brand in "${BRANDS[@]}"; do
  IFS='|' read -r slug display color <<<"$brand"
  echo "== Build brand '$slug'"
  # Fresh full build each time. Same workspace path for both builds - that's
  # what makes the binaries (and dSYM UUIDs) come out identical, as on CI
  # runners with a fixed checkout path.
  rm -rf build/derived
  xcodebuild -project Whitelabel.xcodeproj -scheme Whitelabel -configuration Release \
    -destination "platform=iOS Simulator,id=$UDID" -derivedDataPath build/derived \
    PRODUCT_BUNDLE_IDENTIFIER="com.posthog.whitelabel.$slug" \
    CODE_SIGNING_ALLOWED=NO build >"build/xcodebuild-$slug.log" 2>&1 ||
    { tail -20 "build/xcodebuild-$slug.log"; exit 1; }

  app="build/Whitelabel-$slug.app"
  rm -rf "$app" "build/pipeline-$slug"
  cp -R "$PRODUCTS/Whitelabel.app" "$app"
  mkdir -p "build/pipeline-$slug"
  cp -R "$PRODUCTS/Whitelabel.app.dSYM" "build/pipeline-$slug/"

  /usr/libexec/PlistBuddy \
    -c "Set :CFBundleDisplayName $display" \
    -c "Set :WhitelabelBrandName $slug" \
    -c "Set :WhitelabelBrandColor $color" \
    -c "Set :PostHogProjectToken $TOKEN" \
    -c "Set :PostHogHost $HOST" \
    "$app/Info.plist"
  codesign --force --sign - "$app" 2>/dev/null

  echo "  dSYM UUIDs: $(uuid_set "build/pipeline-$slug/Whitelabel.app.dSYM")"
done

if [[ -n "${POSTHOG_CLI_API_KEY:-}" && -n "${POSTHOG_CLI_PROJECT_ID:-}" ]]; then
  echo "== Upload each build's dSYM - in parallel, same release name"
  export POSTHOG_CLI_HOST="${POSTHOG_CLI_HOST:-$HOST}"
  pids=()
  for brand in "${BRANDS[@]}"; do
    slug="${brand%%|*}"
    "$CLI" dsym upload --directory "build/pipeline-$slug" "${RELEASE[@]}" --include-source \
      >"build/upload-$slug.log" 2>&1 &
    pids+=($!)
  done
  for pid in "${pids[@]}"; do
    wait "$pid" || { echo "Upload failed - see build/upload-*.log" >&2; exit 1; }
  done
  echo "  Done: one upload attached the symbol set, the duplicate was a no-op"
else
  echo "== Upload skipped - set POSTHOG_CLI_PROJECT_ID and POSTHOG_CLI_API_KEY"
fi

echo "== Install both apps"
xcrun simctl bootstatus "$UDID" -b >/dev/null
open -a Simulator
for brand in "${BRANDS[@]}"; do
  slug="${brand%%|*}"
  xcrun simctl install "$UDID" "build/Whitelabel-$slug.app"
done

echo
echo "Run app A (red):  xcrun simctl launch $UDID com.posthog.whitelabel.red"
echo "Run app B (blue): xcrun simctl launch $UDID com.posthog.whitelabel.blue"
echo "Tap 'Capture handled exception' in each - both land in ONE PostHog issue."
