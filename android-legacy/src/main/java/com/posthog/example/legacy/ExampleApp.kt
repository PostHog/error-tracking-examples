package com.posthog.example.legacy

import android.app.Application
import com.posthog.android.PostHogAndroid
import com.posthog.android.PostHogAndroidConfig

class ExampleApp : Application() {
    override fun onCreate() {
        super.onCreate()

        val config =
            PostHogAndroidConfig(
                apiKey = BuildConfig.POSTHOG_KEY,
                host = BuildConfig.POSTHOG_HOST,
            ).apply {
                debug = true
                // Send each event on its own, so a tap shows up in PostHog
                // without waiting for a batch to fill.
                flushAt = 1
                // Not enabled: this example never crashes, it only reports
                // handled exceptions through PostHog.captureException.
                errorTrackingConfig.autoCapture = false
            }

        PostHogAndroid.setup(this, config)
    }
}
