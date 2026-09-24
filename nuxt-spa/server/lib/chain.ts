// Three frames deep, so the symbolicated stack has more than the route handler to resolve.
// Each function name reads back only once the server chunk's sourcemap is applied: the Nitro
// bundle is minified, so an unsymbolicated frame shows a one-letter name in index.mjs.
export function one(marker: string): never {
  return two(marker)
}

function two(marker: string): never {
  return threeRenamed(marker)
}

function threeRenamed(marker: string): never {
  throw new Error(`nuxt-spa server boom ${marker}`)
}
