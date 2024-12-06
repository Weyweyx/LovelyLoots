import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    open: true // Automatically open the browser when the server starts
  },
  build: {
    outDir: 'dist', // Output directory for the built app
    sourcemap: true // Include sourcemaps for easier debugging
  }
});
