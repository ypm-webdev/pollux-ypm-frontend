import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
    include: ['./src/test/**/*.spec.tsx'],
    globals: true,
  },
  // Shared config from vite.config.ts
  resolve: {
    alias: [
      // Add your aliases here if you have any in vite.config.ts
    ],
  },
  define: {
    // You may want to copy any global definitions from vite.config.ts
    // Example:
    // __APP_ENV__: JSON.stringify(process.env.APP_ENV),
  },
  envPrefix: 'REACT_',
})