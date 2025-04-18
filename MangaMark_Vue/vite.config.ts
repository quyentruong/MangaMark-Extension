// @ts-nocheck
import { defineConfig } from 'vite'
import { crx } from '@crxjs/vite-plugin'
import vue from '@vitejs/plugin-vue'
import svgLoader from 'vite-svg-loader'
// @ts-ignore
import manifest from './src/manifest'

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  const production = mode === 'production'
  if (command === 'build') {
    if (mode === 'firefox') {
      delete manifest.background.service_worker
      delete manifest.web_accessible_resources
      manifest.background.scripts = ['src/background/index.ts']
      manifest.browser_specific_settings = {}
      manifest.browser_specific_settings.gecko = {
        id: '{5f310c39-662e-493e-b755-0af887ca98b6}',
        strict_min_version: '118.0',
      }
      manifest.browser_specific_settings.gecko_android = {
        strict_min_version: '118.0',
      }

      return {
        build: {
          emptyOutDir: true,
          outDir: 'build_firefox',
          rollupOptions: {
            input: {
              setup: 'setup.html',
            },
            output: {
              chunkFileNames: 'assets/chunk-[hash].js',
            },
          },
        },
        plugins: [crx({ manifest, browser: 'firefox' }), vue(), svgLoader()],
        legacy: {
          skipWebSocketTokenCheck: true,
        }
      }
    }
    // chrome
    else {
      manifest.update_url =
        'https://raw.githubusercontent.com/quyentruong/MangaMark-Extension/main/updates.xml'
      return {
        build: {
          emptyOutDir: true,
          outDir: 'build',
          rollupOptions: {
            input: {
              setup: 'setup.html',
            },
            output: {
              chunkFileNames: 'assets/chunk-[hash].js',
            },
          },
        },
        plugins: [crx({ manifest }), vue(), svgLoader()],
        legacy: {
          skipWebSocketTokenCheck: true,
        }
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
      plugins: [crx({ manifest }), vue(), svgLoader()],
      legacy: {
        skipWebSocketTokenCheck: true,
      }
    }
  }
})
