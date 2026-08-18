package com.posthog.example.releaseless

/**
 * A few frames' worth of app code for the demo crash to walk through. R8 renames
 * all of it, so the stack trace that reaches PostHog is unreadable until the
 * uploaded mapping is applied to it.
 */
class Checkout(private val gateway: PaymentGateway = PaymentGateway()) {
    fun submit(order: Order): Receipt = Receipt(order.id, gateway.charge(order))
}
// asd
class PaymentGateway(private val amounts: AmountValidator = AmountValidator()) {
    fun charge(order: Order): String {
        amounts.require3(order)
        return "ch_${order.id}"
    }
}

class AmountValidator {
    // A proxy that exists only to put one more frame between the checkout and
    // the failure, so this example's stack trace — and the mapping that decodes
    // it — is visibly not android-legacy's. It survives R8 because the release
    // build runs with -dontoptimize, so nothing inlines it back out.
    fun require3(order: Order) = enforcePositiveAmount(order)

    private fun enforcePositiveAmount(order: Order) {
        // The failure the demo exists to report.
        check(order.amountCents > 0) {
            "Cannot charge order ${order.id}: amount is ${order.amountCents} cents"
        }
    }
}

data class Order(val id: String, val amountCents: Int)

data class Receipt(val orderId: String, val chargeId: String)
