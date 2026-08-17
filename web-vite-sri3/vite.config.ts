// Vite does not load .env into process.env at config-eval time — load it before
// the config reads credentials (same as node-rollup's rollup.config.js).
import 'dotenv/config'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { sri } from 'vite-plugin-sri3'
import posthog from '@posthog/rollup-plugin'

export default defineConfig({
  build: { sourcemap: true },
  plugins: [
    react(),
    // Computes integrity hashes from the in-memory chunks in generateBundle
    // and stamps them onto the script/link tags in dist/index.html.
    sri(),
    // Since 1.4.9 the chunk id is injected in renderChunk, i.e. into the
    // in-memory chunk before sri3 hashes it in generateBundle — so the hashes
    // match. Up to 1.4.7 the injection happened in writeBundle, mutating the
    // .js files on disk after they were hashed; plugin order could not fix
    // that, since generateBundle always completes before writeBundle starts.
    posthog({
      personalApiKey: process.env.POSTHOG_API_KEY,
      projectId: process.env.POSTHOG_PROJECT_ID,
      host: process.env.POSTHOG_HOST,
      sourcemaps: {
        enabled: true,
        releaseName: 'web-vite-sri3-error-tracking-example',
        releaseVersion: '1.0.0',
        // Keep .map files on disk so the injected chunk id stays inspectable.
        deleteAfterUpload: false,
      },
    }),
  ],
})
