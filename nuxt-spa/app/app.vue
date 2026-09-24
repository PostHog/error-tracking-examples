<script setup lang="ts">
// Client-only page (ssr: false). The button throws through app/lib/chain.ts inside a Vue event
// handler; Vue routes that to app.config.errorHandler, which Nuxt exposes as the `vue:error`
// hook, and the @posthog/nuxt Vue plugin captures it with posthog-js when
// clientConfig.capture_exceptions is on. The probe opens `/?marker=<uuid>` and clicks the button.
import { one } from './lib/chain'

const route = useRoute()
const marker = computed(() => String(route.query.marker ?? 'manual'))
// Which run produced this bundle (scripts/run-config.mjs); the probe checks it against its own.
const run = useRuntimeConfig().public.nuxtSpa.run
const thrown = ref(false)

function boom() {
  thrown.value = true
  one(marker.value)
}
</script>

<template>
  <main>
    <h1>nuxt-spa</h1>
    <p>
      Client-only Nuxt app with <code>@posthog/nuxt</code> sourcemap upload. Run:
      <code id="run">{{ run }}</code>. Marker: <code id="marker">{{ marker }}</code>
    </p>
    <button id="throw" @click="boom">Throw client exception</button>
    <p id="thrown" v-if="thrown">thrown</p>
    <p>
      <a :href="`/api/boom?marker=${marker}`">GET /api/boom</a> throws the server-side twin.
    </p>
  </main>
</template>
