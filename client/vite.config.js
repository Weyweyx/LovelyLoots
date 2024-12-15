import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    open: true,
    proxy: {
      '/grapghql': {
        target: 'http://localhost:5173',
        secure: false,
        changeOrigin: true
      }
    }
  },
})
