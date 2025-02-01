# Vue 3 + Vite + Module Federation

First raw test focusing on how to setup a Product with a shell and 2 MFE's within

Steps to start:
run scripts from global package.json

1) npm install:all
2) build:mfe1 / build:mfe2
3) start

Open Browser and enter the following url: http://localhost:5000/



Setup a project like this:

1) create 3 independed vue projects.
npm create vite@latest shell-app -- --template vue-ts
npm create vite@latest mfe1 -- --template vue-ts
npm create vite@latest mfe2 -- --template vue-ts


2) install the vite modulfederation in each project

npm install @originjs/vite-plugin-federation --save-dev

3) configure the mfe's

- open the vite.config.ts file (both mfe1 & mfe2)
- add import: import federation from '@originjs/vite-plugin-federation'
- setup the exposes: 

export default defineConfig({
  plugins: [
    vue(),
    federation({
      //The name of your host application
      name: "mfe1",
      filename: "remoteEntry.js",
      // Modules to expose
      exposes: {
        "./App": "./src/App.vue",
      },
      // Common dependencies that should be shared
      shared: ["vue"],
    }),
  ],
  build: {
    target: "esnext",
    minify: false,
    cssCodeSplit: false,
    rollupOptions: {
      output: {
        minifyInternalExports: false,
      },
    },
  },
});


Notes:

The federation plugin is configured with:

name: The name of your host application
exposes: Components you want to share with other applications
remotes: External components you want to consume
shared: Common dependencies that should be shared

Important configuration notes:

Set target: 'esnext' in the build options
Disable minification during development
Disable CSS code splitting
Configure shared dependencies (like Vue) as singletons
