import { useCallback, useEffect, useMemo } from 'react'
import { Button, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import PostHog from 'posthog-react-native'
import * as Application from 'expo-application'

import { checkout } from './src/checkout'
import { File, Paths } from 'expo-file-system'

import { crashNow } from './modules/crash-test'

// Expo inlines EXPO_PUBLIC_* at build time, which is how these reach a bundle React Native cannot
// read a .env from. bin/run-ios exports them from the repo root .env.
const POSTHOG_HOST = process.env.EXPO_PUBLIC_POSTHOG_HOST || 'http://localhost:8010'
const POSTHOG_KEY = process.env.EXPO_PUBLIC_POSTHOG_KEY || ''
const AUTO_CAPTURE = process.env.EXPO_PUBLIC_AUTO_CAPTURE === '1'
// Kills the app a few seconds after the JavaScript exception, so one launch produces both kinds
// of report. The native one only reaches PostHog on the launch after that.
const AUTO_NATIVE_CRASH = process.env.EXPO_PUBLIC_AUTO_NATIVE_CRASH === '1'
// Inlined into the bundle, which is the point: the two variants are separate apps with
// separate bundle identifiers, so their JavaScript has to differ too. A hermes chunk id is
// derived from bundle content, so identical bundles would land on one symbol set and the
// second variant to build would fail on a content conflict.
const APP_VARIANT = process.env.EXPO_PUBLIC_APP_VARIANT || 'legacy'

export default function App() {
  const posthog = useMemo(
    () =>
      new PostHog(POSTHOG_KEY, {
        host: POSTHOG_HOST,
        flushAt: 1,
        flushInterval: 0,
        // Hands crash handling to posthog-ios through @posthog/react-native-plugin. Without it a
        // native crash leaves no event at all, because the JavaScript SDK never sees it.
        errorTracking: { autocapture: { nativeCrashes: true } },
      }),
    []
  )

  const capture = useCallback(() => {
    try {
      checkout({ total: -1 })
    } catch (error) {
      posthog.captureException(error)
    }
  }, [posthog])

  // The run script drives a full build without anyone tapping the screen, so it asks for one
  // exception on launch. The delay lets the SDK finish loading its remote config first.
  useEffect(() => {
    if (!AUTO_CAPTURE) {
      return undefined
    }
    const timer = setTimeout(capture, 3000)
    return () => clearTimeout(timer)
  }, [capture])

  // Crash on a launch that starts with empty storage, and stay up on the launch after it. The
  // report only leaves the device on the launch after the crash, and the queue flushes on a timer,
  // so that second launch has to survive. The marker file is what tells the two apart, and it is
  // written before the crash so an early crash still leaves the next launch free to send.
  useEffect(() => {
    if (!AUTO_NATIVE_CRASH) {
      return undefined
    }
    const marker = new File(Paths.document, 'native-crash-armed')
    if (marker.exists) {
      marker.delete()
      return undefined
    }
    const timer = setTimeout(() => {
      marker.create()
      crashNow()
    }, 10000)
    return () => clearTimeout(timer)
  }, [])

  // These are the three values event release mode resolves an exception's release from, so seeing
  // them on screen is the fastest way to check a build is the one you meant to run.
  const rows = [
    ['variant', APP_VARIANT],
    ['$app_namespace', Application.applicationId],
    ['$app_version', Application.nativeApplicationVersion],
    ['$app_build', Application.nativeBuildVersion],
  ]

  return (
    <SafeAreaView style={styles.screen}>
      <Text style={styles.title}>PostHog error tracking</Text>
      <View style={styles.table}>
        {rows.map(([label, value]) => (
          <View key={label} style={styles.row}>
            <Text style={styles.label}>{label}</Text>
            <Text style={styles.value}>{String(value)}</Text>
          </View>
        ))}
      </View>
      <Button title="Capture exception" onPress={capture} />
      <Button title="Crash natively" onPress={crashNow} color="#c00" />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  screen: { flex: 1, justifyContent: 'center', alignItems: 'center', gap: 24, padding: 24 },
  title: { fontSize: 18, fontWeight: '600' },
  table: { gap: 6, alignSelf: 'stretch' },
  row: { flexDirection: 'row', justifyContent: 'space-between', gap: 12 },
  label: { fontFamily: 'Menlo', fontSize: 11, color: '#666' },
  value: { fontFamily: 'Menlo', fontSize: 11, flexShrink: 1, textAlign: 'right' },
})
