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
          type: "app",
          pattern: "app",
        },
        {
          type: "pages",
          pattern: "pages/*",
          capture: ["page"],
        },
        {
          type: "features",
          pattern: "features/*",
          capture: ["feature"],
        },
        {
          type: "services",
          pattern: "services/*",
          capture: ["service"],
        },
        {
          type: "kernel",
          pattern: "kernel/*",
        },
        {
          type: "shared",
          pattern: "shared/*",
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
              target: ["pages", "features", "services"],
              allow: ["index.ts", "index.tsx"],
            },
            {
              target: ["kernel", "app"],
              allow: "*",
            },
            {
              target: ["shared"],
              allow: ["*", "*/index.ts"],
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
              from: ["pages"],
              disallow: ["app"],
            },
            {
              from: "features",
              disallow: ["app", "pages"],
            },
            {
              from: ["services"],
              disallow: ["app", "pages", "features"],
            },
            {
              from: ["kernel"],
              disallow: ["app", "pages", "features", "services"],
            },
            {
              from: ["shared"],
              disallow: ["app", "pages", "features", "kernel", "services"],
            },
            {
              from: ["pages"],
              message: "Module must not import other module",
              disallow: [
                [
                  "pages",
                  {
                    module: "!${page}",
                  },
                ],
              ],
            },
            {
              from: ["features"],
              message: "Module must not import other module",
              disallow: [
                [
                  "features",
                  {
                    module: "!${feature}",
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
