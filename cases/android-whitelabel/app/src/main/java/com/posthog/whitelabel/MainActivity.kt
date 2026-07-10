package com.posthog.whitelabel

import android.app.Activity
import android.graphics.Color
import android.graphics.Typeface
import android.graphics.drawable.GradientDrawable
import android.os.Bundle
import android.view.Gravity
import android.view.View
import android.widget.Button
import android.widget.LinearLayout
import android.widget.TextView
import com.posthog.PostHog

class MainActivity : Activity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        val brand = packageName.substringAfterLast('.')
        val brandColor = when (brand) {
            "red" -> "#F54E00"
            "blue" -> "#1D4AFF"
            else -> "#8F8F8F"
        }
        val density = resources.displayMetrics.density
        fun dp(value: Int): Int = (value * density).toInt()

        val circle = View(this).apply {
            background = GradientDrawable().apply {
                shape = GradientDrawable.OVAL
                setColor(Color.parseColor(brandColor))
            }
            layoutParams = LinearLayout.LayoutParams(dp(64), dp(64)).apply { bottomMargin = dp(16) }
        }
        val title = TextView(this).apply {
            text = brand.replaceFirstChar { it.uppercase() }
            textSize = 22f
            setTypeface(null, Typeface.BOLD)
        }
        val subtitle = TextView(this).apply {
            text = packageName
            textSize = 12f
            typeface = Typeface.MONOSPACE
        }
        val status = TextView(this).apply {
            textSize = 12f
            layoutParams = LinearLayout.LayoutParams(
                LinearLayout.LayoutParams.WRAP_CONTENT,
                LinearLayout.LayoutParams.WRAP_CONTENT,
            ).apply { topMargin = dp(8) }
        }
        val button = Button(this).apply {
            text = "Capture handled exception"
            layoutParams = LinearLayout.LayoutParams(
                LinearLayout.LayoutParams.WRAP_CONTENT,
                LinearLayout.LayoutParams.WRAP_CONTENT,
            ).apply { topMargin = dp(16) }
            setOnClickListener {
                try {
                    CheckoutService.buyPremium()
                } catch (e: CheckoutException) {
                    PostHog.captureException(e, mapOf("brand" to brand))
                    PostHog.flush()
                    status.text = "Captured CheckoutException and flushed."
                }
            }
        }

        setContentView(
            LinearLayout(this).apply {
                orientation = LinearLayout.VERTICAL
                gravity = Gravity.CENTER
                addView(circle)
                addView(title)
                addView(subtitle)
                addView(button)
                addView(status)
            },
        )
    }
}
