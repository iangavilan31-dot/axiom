import { defineConfig } from 'vite'
import { viteSingleFile } from 'vite-plugin-singlefile'

// Single-file build: JS, CSS and the chalk fonts are all inlined into one
// self-contained index.html so the "downloadable" opens straight from disk
// (double-click, file://) with no server and no CORS blocks.
export default defineConfig({
  base: './',
  plugins: [viteSingleFile()],
  server: { port: 5127, strictPort: true },
  build: {
    chunkSizeWarningLimit: 4000,
    assetsInlineLimit: 100_000_000, // inline every asset (fonts) as data URIs
    cssCodeSplit: false,
  },
})
