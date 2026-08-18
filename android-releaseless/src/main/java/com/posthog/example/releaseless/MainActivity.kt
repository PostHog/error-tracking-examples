package com.posthog.example.releaseless

import android.app.Activity
import android.os.Bundle
import android.util.Log
import android.view.Gravity
import android.widget.Button
import android.widget.LinearLayout
import android.widget.TextView
import com.posthog.PostHog

class MainActivity : Activity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        val status =
            TextView(this).apply {
                gravity = Gravity.CENTER
                text = "Tap to send a handled exception to PostHog"
            }

        val capture =
            Button(this).apply {
                text = "Capture exception"
                setOnClickListener { status.text = captureDemoException() }
            }

        setContentView(
            LinearLayout(this).apply {
                orientation = LinearLayout.VERTICAL
                gravity = Gravity.CENTER
                addView(status)
                addView(capture)
            },
        )
    }

    /**
     * Reports a handled exception. Nothing here crashes the app — the interesting
     * part is the stack trace, which R8 obfuscated and only the uploaded mapping
     * can read back.
     */
    private fun captureDemoException(): String =
        try {
            Checkout().submit(Order("demo", amountCents = 0))
            "No exception — the demo order was charged?"
        } catch (e: IllegalStateException) {
            PostHog.captureException(e)
            // Queued on the SDK's executor, so this does not block the main thread.
            PostHog.flush()
            Log.i(TAG, "$CAPTURED_MARKER ${e.javaClass.name} v${BuildConfig.VERSION_NAME}")
            "Captured ${e.javaClass.simpleName} — check PostHog error tracking"
        }

    private companion object {
        const val TAG = "PostHogExample"

        // Grep-able in the logcat stream ../bin/android-run leaves running.
        const val CAPTURED_MARKER = "POSTHOG_EXAMPLE_CAPTURED"
    }
}
