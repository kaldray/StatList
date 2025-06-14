import { reactRouter } from "@react-router/dev/vite";
import { defineConfig } from "vite";
import { fileURLToPath } from "node:url";

const ReactCompilerConfig = {
  target: "19",
};
import babel from "vite-plugin-babel";

export default defineConfig({
  server: {
    port: 3000,
  },
  plugins: [
    babel({
      filter: /\.[jt]sx?$/,
      babelConfig: {
        presets: ["@babel/preset-typescript"],
        plugins: [["babel-plugin-react-compiler", ReactCompilerConfig]],
      },
    }),
    ,
    reactRouter(),
  ],
  resolve: {
    alias: {
      "@styles": fileURLToPath(new URL("./scss", import.meta.url)),
      "@components": fileURLToPath(new URL("./src/components", import.meta.url)),
      "@providers": fileURLToPath(new URL("./providers", import.meta.url)),
      "@src": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});
