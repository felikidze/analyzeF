import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, './src'),
      "@components": `${path.resolve(__dirname, './src/components/')}`,
      "@router": `${path.resolve(__dirname, './src/components/_router/')}`,
      "@shared": `${path.resolve(__dirname, './src/components/_shared/')}`,
      "@context": `${path.resolve(__dirname, './src/components/context/')}`,
      "@hooks": `${path.resolve(__dirname, './src/hooks/')}`,
    }
  }
})
