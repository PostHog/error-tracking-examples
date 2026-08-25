// Deepest frame in the throw chain. Its own module so the minified stack has three distinct
// source files to resolve back to, not one.
export function assertPositiveTotal(amount) {
  if (amount <= 0) {
    throw new RangeError(`Cart total must be a positive amount, got ${amount}`)
  }
  return amount
}
