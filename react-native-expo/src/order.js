import { assertPositiveTotal } from './amount'

export function placeOrder(order) {
  assertPositiveTotal(order.amount)
  return { ...order, status: 'placed' }
}
