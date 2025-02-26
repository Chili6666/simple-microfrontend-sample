import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import federation from "@originjs/vite-plugin-federation";
import remotes from "./public/config/remotes.json";

// const remotes = {
//   mfe1: "http://localhost:4001/assets/remoteEntry.js",
//   mfe2: "http://localhost:4002/assets/remoteEntry.js",
// };

export default defineConfig({
  plugins: [
    vue(),
    federation({
      name: "app-shell",
      remotes: remotes,
      shared: ["vue"],
    }),
  ],
  server: {
    port: 5000,
  },
  build: {
    target: "esnext", // Use a target that supports top-level await
    minify: false,
    cssCodeSplit: false,
  },
});
