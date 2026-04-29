import antfu from "@antfu/eslint-config";
import js from "@eslint/js";
import globals from "globals";

export default antfu({
  type: "app",
  formatters: true,
  react: true,
  stylistic: {
    indent: 2,
    semi: true,
    quotes: "double",
  },
  ignores: [
    ".wrangler/*",
    ".pnpm-store/*",
    "./**/*.gen.ts",
  ],
  languageOptions: {
    globals: globals.browser,
  },
}, {
  files: ["**/*.{ts,tsx}"],
  extends: [
    js.configs.recommended,
  ],
  rules: {
    "perfectionist/sort-imports": ["error", {
      tsconfig: {
        rootDir: ".",
      },
    }],
  },
});
