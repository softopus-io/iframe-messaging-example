import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
  // Required for GitHub Pages: the repo is served at
  // https://<org>.github.io/iframe-messaging-example/
  base: "/iframe-messaging-example/",

  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        iframe: resolve(__dirname, "iframe/index.html"),
      },
    },
    outDir: "dist",
    emptyOutDir: true,
  },
});
