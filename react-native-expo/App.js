import { useMemo } from 'react'
import { Button, SafeAreaView, Text } from 'react-native'
import PostHog from 'posthog-react-native'

// React Native cannot read .env at runtime, so the values are inlined. Both are
// public: update POSTHOG_KEY to your local project token (POSTHOG_KEY in the repo
// root .env) before running the app on a device.
const POSTHOG_HOST = 'http://localhost:8010'
const POSTHOG_KEY = 'phc_kD64gg5WuNKZnrtXAxVrMiDdL49jeTfCxTsnvzM2DugB'

export default function App() {
  const posthog = useMemo(
    () =>
      new PostHog(POSTHOG_KEY, {
        host: POSTHOG_HOST,
        flushAt: 1,
        flushInterval: 0,
      }),
    []
  )

  return (
    <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center', gap: 16 }}>
      <Text>PostHog error tracking - Expo example</Text>
      <Button
        title="Capture exception"
        onPress={() => {
          posthog.captureException(new Error('boom'))
        }}
      />
    </SafeAreaView>
  )
}
