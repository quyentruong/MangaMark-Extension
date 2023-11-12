import { defineConfig } from 'vite'
import { crx } from '@crxjs/vite-plugin'
import vue from '@vitejs/plugin-vue'
import manifest from './src/manifest.js'

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  const production = mode === 'production'
  if (command === 'build') {
    if (mode === 'firefox') {
      delete manifest.background.service_worker
      delete manifest.web_accessible_resources
      manifest.background.scripts = ['src/background/index.js']
      manifest.browser_specific_settings = {}
      manifest.browser_specific_settings.gecko = {
        id: 'emptydoremon@gmail.com',
        strict_min_version: '112.0',
      }

      return {
        build: {
          emptyOutDir: true,
          outDir: 'build_firefox',
          rollupOptions: {
            output: {
              chunkFileNames: 'assets/chunk-[hash].js',
            },
          },
        },
        plugins: [crx({ manifest, browser: 'firefox' }), vue()],
      }
    }
    // chrome
    else {
      manifest.update_url = 'https://raw.githubusercontent.com/quyentruong/MangaMark-Extension/main/updates.xml'
      return {
        build: {
          emptyOutDir: true,
          outDir: 'build',
          rollupOptions: {
            output: {
              chunkFileNames: 'assets/chunk-[hash].js',
            },
          },
        },
        plugins: [crx({ manifest }), vue()],
      }
    }
  }
  // dev
  else {
    manifest.name += ' Dev'
    return {
      build: {
        emptyOutDir: true,
        outDir: 'dev',
      },
      plugins: [crx({ manifest }), vue()],
    }
  }
})
