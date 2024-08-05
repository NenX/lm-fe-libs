import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import legacy from '@vitejs/plugin-legacy'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    legacy({
      targets: ['defaults', 'IE 11']
    })
  ],
  base: './',
  server: {
    proxy: {
      '/api': 'http://120.77.43.63:3351/',
    }
  },
  build: {
    target: 'es2015'
  }
})



