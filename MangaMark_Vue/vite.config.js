import { defineConfig } from 'vite'
import { crx } from '@crxjs/vite-plugin'
import vue from '@vitejs/plugin-vue'
import manifest from './src/manifest.js'

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  const production = mode === 'production'
  if (command === 'build') {
    if (mode === 'firefox') {
      console.log('firefox build')
    }
    // chrome
    else {
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
