import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import viteTsconfigPaths from 'vite-tsconfig-paths'
import eslintPlugin from "@nabla/vite-plugin-eslint"

const env = loadEnv(process.env.NODE_ENV || 'development', process.cwd(), '');

export default defineConfig({
  base: '/',
  plugins: [react(), viteTsconfigPaths(), eslintPlugin()],
  define: {
    __APP_ENV__: JSON.stringify(env.APP_ENV),
  },
  envPrefix: 'REACT_',
  server: {
    open: true,
    port: 3000,
  },
});
