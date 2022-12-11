import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { ViteEjsPlugin } from 'vite-plugin-ejs'

export default defineConfig({
  plugins: [
    react(),
    ViteEjsPlugin(viteConfig => ({
      env: viteConfig.env,
      isDev: viteConfig.mode === 'development',
    })),
  ],
  base: '/another-tasks/',
})
