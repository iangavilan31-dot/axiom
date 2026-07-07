import { defineConfig } from 'vite'

// base './' so the built dist/ opens straight from disk (downloadable offline bundle)
export default defineConfig({
  base: './',
  server: { port: 5127, strictPort: true },
  build: { chunkSizeWarningLimit: 2000 },
})
