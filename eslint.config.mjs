// @ts-check
import { defineConfig } from "eslint/config";
import react from "eslint-plugin-react";
import js from "@eslint/js";
import reactHooks from "eslint-plugin-react-hooks";
import tseslint from "typescript-eslint";
import globals from "globals";

// export default defineConfig(
//   reactHooks.configs["recommended-latest"],
//   tseslint.configs.recommended,
//   react.configs["recommended"],
// );

export default tseslint.config(
  {
    files: ["**/*.{js,jsx,mjs,cjs,ts,tsx}"],
    plugins: {
      react,
    },
    languageOptions: {
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        ...globals.browser,
      },
    },
    settings: {
      react: {
        version: "detect",
      },
    },
  },
  react.configs.flat.recommended,
  react.configs.flat["jsx-runtime"],
  reactHooks.configs["recommended-latest"],
  tseslint.configs.recommended,
);
