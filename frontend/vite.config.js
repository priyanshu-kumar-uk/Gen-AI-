import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server:{
    host:"0.0.0.0",
    proxy:{
      "/api":{
        target:"http://backned:3000",
        secure: false,
        changeOrigin: true
      }
    },
    watch:{
      usePolling:true
    }
  }
})
