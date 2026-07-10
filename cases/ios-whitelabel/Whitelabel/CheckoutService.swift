//
//  CheckoutService.swift
//
//  Fails identically in every brand. @inline(never) keeps the call chain
//  visible in Release stack traces.
//

import Foundation

enum CheckoutError: Error {
    case paymentDeclined(code: Int)
}

enum CheckoutService {
    @inline(never)
    static func buyPremium() throws {
        try validateCart()
    }

    @inline(never)
    private static func validateCart() throws {
        try chargeCard()
    }

    @inline(never)
    private static func chargeCard() throws {
        throw CheckoutError.paymentDeclined(code: 402)
    }
}
