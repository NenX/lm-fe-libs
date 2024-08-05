import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import legacy from '@vitejs/plugin-legacy'
// https://vitejs.dev/config/
export default defineConfig({
    css: {
        preprocessorOptions: {
            less: {
                javascriptEnabled: true,
            },
        },
    },
    plugins: [
        react(),
        legacy({
            targets: ['defaults', 'IE 11'],
        }),
    ],
    base: './',
    server: {
        proxy: {
            '/api': 'http://120.78.156.10:3351/',
            '/as': 'http://192.168.3.18:3002/',
            '/Obcloud': 'http://192.168.3.24:8080/',
        },
    },
    build: {
        target: 'es2015',
    },
})
