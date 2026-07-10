// Brand comes from the applicationId suffix build.sh passes to Gradle.
// PostHog token and host are baked in as BuildConfig fields. The code is
// identical in every brand.
package com.posthog.whitelabel

import android.app.Application
import android.util.Log
import com.posthog.android.PostHogAndroid
import com.posthog.android.PostHogAndroidConfig

class WhitelabelApp : Application() {
    override fun onCreate() {
        super.onCreate()

        if (BuildConfig.POSTHOG_TOKEN.isEmpty()) {
            Log.w("Whitelabel", "No posthogToken set - run build.sh with a token")
            return
        }
        val config = PostHogAndroidConfig(BuildConfig.POSTHOG_TOKEN, BuildConfig.POSTHOG_HOST)
        config.errorTrackingConfig.autoCapture = true
        config.debug = true
        PostHogAndroid.setup(this, config)
    }
}
