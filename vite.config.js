import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
  root: "src/",

  build: {
    outDir: "../dist",
    rollupOptions: {
      input: {
        main: resolve(__dirname, "src/index.html"),
        inventory: resolve(__dirname, "src/inventory.html"),
        spells: resolve(__dirname, "src/spells.html"),
      },
    },
  },
});
