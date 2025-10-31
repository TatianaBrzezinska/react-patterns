import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";
import boundaries from "eslint-plugin-boundaries";

export default tseslint.config(
  { ignores: ["dist"] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],
    },
  },
  {
    plugins: { boundaries },
    settings: {
      "boundaries/elements": [
        {
          type: "router",
          pattern: "router",
        },
        {
          type: "modules",
          pattern: "modules/*",
          capture: ["module"],
        },
        {
          type: "interfaces",
          pattern: "interfaces/*",
        },
      ],
      "import/resolver": {
        typescript: {
          alwaysTryTypes: true,
        },
      },
    },
    rules: {
      "boundaries/entry-point": [
        2,
        {
          default: "disallow",
          rules: [
            {
              target: ["modules", "router"],
              allow: "index.ts",
            },
            {
              target: ["interfaces"],
              allow: "*",
            },
          ],
        },
      ],
      "boundaries/element-types": [
        2,
        {
          // disallow importing any element by default
          default: "allow",
          rules: [
            {
              from: ["interfaces"],
              disallow: ["router", "modules"],
            },
            {
              from: ["modules"],
              disallow: ["router"],
            },
            {
              from: ["modules"],
              message: "Module must not import other module",
              disallow: [
                [
                  "modules",
                  {
                    module: "!${module}",
                  },
                ],
              ],
            },
          ],
        },
      ],
    },
  }
);
