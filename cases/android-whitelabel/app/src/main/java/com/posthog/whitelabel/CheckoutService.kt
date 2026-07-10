// Fails identically in every brand.
package com.posthog.whitelabel

class CheckoutException(message: String) : Exception(message)

object CheckoutService {
    fun buyPremium() {
        validateCart()
    }

    private fun validateCart() {
        chargeCard()
    }

    private fun chargeCard() {
        throw CheckoutException("Payment declined (code 402)")
    }
}
