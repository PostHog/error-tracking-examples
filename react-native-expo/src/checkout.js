import { placeOrder } from './order'

// Entry point for the throw chain: checkout -> placeOrder -> validateAmount.
export function checkout(cart) {
  return placeOrder({ amount: cart.total, currency: 'USD' })
}
