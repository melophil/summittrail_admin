import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/summittrail_admin/',   // ⭐ REQUIRED FOR GITHUB PAGES
  server: { port: 5173 }
})
