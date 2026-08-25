import { requireNativeModule } from 'expo-modules-core'

// Terminates the app. posthog-ios writes the report to disk from its crash handler, so the event
// only reaches PostHog on the next launch.
export function crashNow() {
  requireNativeModule('CrashTest').crashNow()
}
