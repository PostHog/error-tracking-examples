#!/usr/bin/env bash
#
# Builds the same app once per brand (like separate CI pipelines) and installs
# both. There is no bespoke upload step here: each build's Xcode "Upload dSYMs
# to PostHog" run-script phase uploads that build's dSYM the exact way a real
# app ships. The phase forces ONE shared release name (never a bundle ID). The
# builds share identical dSYM UUIDs, so whichever pipeline uploads first
# attaches the symbol set and the rest are no-ops - no coordination or ordering.
#
# Usage: ./build.sh [phc_PROJECT_TOKEN] [host]
#   Defaults come from PostHogProjectToken / PostHogHost in Whitelabel/Info.plist.
#   Upload needs POSTHOG_CLI_PROJECT_ID + POSTHOG_CLI_API_KEY (skipped otherwise).

set -euo pipefail
cd "$(dirname "$0")"

TOKEN="${1:-$(/usr/libexec/PlistBuddy -c 'Print :PostHogProjectToken' Whitelabel/Info.plist)}"
HOST="${2:-$(/usr/libexec/PlistBuddy -c 'Print :PostHogHost' Whitelabel/Info.plist)}"
BRANDS=("red|Acme Red|#F54E00" "blue|Acme Blue|#1D4AFF")
PRODUCTS="build/derived/Build/Products/Release-iphonesimulator"
uuid_set() { dwarfdump --uuid "$1" | awk '{print $2}' | sort | paste -sd' ' -; }

# The upload runs inside xcodebuild's build phase, which inherits this env.
export POSTHOG_CLI_HOST="${POSTHOG_CLI_HOST:-$HOST}"
if [[ -z "${POSTHOG_CLI_API_KEY:-}" || -z "${POSTHOG_CLI_PROJECT_ID:-}" ]]; then
  echo "== Upload will be skipped - set POSTHOG_CLI_PROJECT_ID and POSTHOG_CLI_API_KEY to enable"
fi

UDID=$(xcrun simctl list devices booted | grep -m1 -oE '[0-9A-F-]{36}' || true)
[[ -n "$UDID" ]] || UDID=$(xcrun simctl list devices available | grep iPhone | grep -m1 -oE '[0-9A-F-]{36}') ||
  { echo "No iPhone simulator found" >&2; exit 1; }

mkdir -p build
for brand in "${BRANDS[@]}"; do
  IFS='|' read -r slug display color <<<"$brand"
  echo "== Build brand '$slug' (its build phase uploads the dSYM)"
  # Fresh full build each time. Same workspace path for both builds - that's
  # what makes the binaries (and dSYM UUIDs) come out identical, as on CI
  # runners with a fixed checkout path.
  rm -rf build/derived
  xcodebuild -project Whitelabel.xcodeproj -scheme Whitelabel -configuration Release \
    -destination "platform=iOS Simulator,id=$UDID" -derivedDataPath build/derived \
    PRODUCT_BUNDLE_IDENTIFIER="com.posthog.whitelabel.$slug" \
    CODE_SIGNING_ALLOWED=NO build >"build/xcodebuild-$slug.log" 2>&1 ||
    { tail -20 "build/xcodebuild-$slug.log"; exit 1; }

  echo "  dSYM UUIDs: $(uuid_set "$PRODUCTS/Whitelabel.app.dSYM")"

  app="build/Whitelabel-$slug.app"
  rm -rf "$app"
  cp -R "$PRODUCTS/Whitelabel.app" "$app"

  /usr/libexec/PlistBuddy \
    -c "Set :CFBundleDisplayName $display" \
    -c "Set :WhitelabelBrandName $slug" \
    -c "Set :WhitelabelBrandColor $color" \
    -c "Set :PostHogProjectToken $TOKEN" \
    -c "Set :PostHogHost $HOST" \
    "$app/Info.plist"
  codesign --force --sign - "$app" 2>/dev/null
done

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
