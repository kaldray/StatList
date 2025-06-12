import { reactRouter } from "@react-router/dev/vite";
import { defineConfig } from "vite";
import { fileURLToPath } from "node:url";

export default defineConfig({
  server: {
    port: 3000,
  },
  plugins: [reactRouter()],
  resolve: {
    alias: {
      "@styles": fileURLToPath(new URL("./scss", import.meta.url)),
      "@components": fileURLToPath(new URL("./src/components", import.meta.url)),
      "@providers": fileURLToPath(new URL("./providers", import.meta.url)),
      "@src": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});
