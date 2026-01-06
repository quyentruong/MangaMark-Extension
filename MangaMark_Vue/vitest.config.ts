import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'jsdom',
    exclude: ['test_archive/**', 'node_modules/**'],
    // reporters: ['verbose']
  },
})
