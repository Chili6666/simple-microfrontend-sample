import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import federation from '@originjs/vite-plugin-federation'

export default defineConfig({
  plugins: [
    vue(),
    federation({
      name: 'app-shell',
      remotes: {
        mfe1: 'http://localhost:4001/assets/remoteEntry.js',
        mfe2: 'http://localhost:4002/assets/remoteEntry.js'
      },
      shared: ['vue']
    })
  ],
  server: {
    port: 5000
  }
})