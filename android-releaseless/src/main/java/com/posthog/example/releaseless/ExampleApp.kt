package com.posthog.example.releaseless

import android.app.Application
import com.posthog.android.PostHogAndroid
import com.posthog.android.PostHogAndroidConfig
import com.posthog.internal.PostHogDateProvider
import java.util.Date

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
                dateProvider = DeviceClockDateProvider()
            }

        PostHogAndroid.setup(this, config)
    }
}

/**
 * Timestamps events off the device's own clock.
 *
 * The SDK otherwise prefers `SystemClock.currentNetworkTimeClock()`, and an
 * emulator resumed from a snapshot restores that clock from whenever the
 * snapshot was taken while the host corrects only the wall clock. Events then
 * arrive weeks in the past and fall outside the dashboard's date range, which
 * looks exactly like they were never ingested. Any implementation that is not a
 * PostHogDeviceDateProvider is left alone by PostHogAndroid.setup.
 */
private class DeviceClockDateProvider : PostHogDateProvider {
    override fun currentDate(): Date = Date()

    override fun addSecondsToCurrentDate(seconds: Int): Date = Date(currentTimeMillis() + seconds * 1000L)

    override fun currentTimeMillis(): Long = System.currentTimeMillis()

    override fun nanoTime(): Long = System.nanoTime()
}
