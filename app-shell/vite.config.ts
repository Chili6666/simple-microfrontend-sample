import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import federation from '@originjs/vite-plugin-federation'
import remotes from "./public/config/remotes.json";


const getFormattedRemotes = () => { 
  return  Object.fromEntries(Object.entries(remotes).map(([key, value]) => [key, value.url]));
}

export default defineConfig({
  plugins: [
    vue(),
    federation({
      name: 'app-shell',
      remotes: getFormattedRemotes(),
      shared: ['vue']
    })
  ],
  server: {
    port: 5000
  },
  build: {
    target: 'esnext', // Use a target that supports top-level await
    minify: false,
    cssCodeSplit: false
  }
})