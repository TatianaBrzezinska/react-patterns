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
          type: "tasks-list",
          pattern: "tasks-list",
        },
        {
          type: "tracks-modal",
          pattern: "tracks-modal",
        },
        {
          type: "tracks-table",
          pattern: "tracks-table",
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
              target: ["tracks-table", "tasks-list", "tracks-modal", "router"],
              allow: "index.ts",
            },
          ],
        },
      ],
    },
  }
);
