// The client-side twin of server/lib/chain.ts: three frames from the button to the throw.
export function one(marker: string): never {
  return two(marker)
}

function two(marker: string): never {
  return threeRenamed(marker)
}

function threeRenamed(marker: string): never {
  throw new Error(`nuxt-spa client boom ${marker}`)
}
