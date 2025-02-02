import eslintJs from "@eslint/js"
import prettier from "eslint-config-prettier"
import sonarjs from "eslint-plugin-sonarjs"
import unicorn from "eslint-plugin-unicorn"
import globals from "globals"
import tseslint from "typescript-eslint"

const base = tseslint.config(
  eslintJs.configs.all,
  tseslint.configs.strictTypeChecked,
  tseslint.configs.stylisticTypeChecked,
  unicorn.configs["flat/all"],
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  sonarjs.configs.recommended,
)

const baseOverride = tseslint.config(
  prettier,
  {
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      parserOptions: {
        projectService: true,
      },
      globals: globals.node,
    },
  },
  {
    rules: {
      // eslint
      "sort-imports": "off",
      "sort-keys": "off",
      "capitalized-comments": "off",
      "one-var": "off",
      "func-style": "off",
      "consistent-return": "off",
      "no-ternary": "off",
      "no-inline-comments": "off",
      "max-statements": "off",
      "no-console": "off",
      "no-continue": "off",
      "no-magic-numbers": "off",
      "id-length": "off",
      camelcase: "off",
      "no-undefined": "off",
      "prefer-destructuring": "off",
      "require-unicode-regexp": ["error", { requireFlag: "v" }],

      // typescript-eslint
      "@typescript-eslint/no-confusing-void-expression": [
        "error",
        {
          ignoreArrowShorthand: true,
        },
      ],
      "@typescript-eslint/consistent-type-imports": "error",
      "@typescript-eslint/consistent-type-exports": "error",
      "@typescript-eslint/no-import-type-side-effects": "error",
      "@typescript-eslint/explicit-member-accessibility": "error",
      "@typescript-eslint/method-signature-style": "error",
      "@typescript-eslint/no-unnecessary-qualifier": "error",
      "@typescript-eslint/no-unsafe-type-assertion": "error",
      "@typescript-eslint/no-useless-empty-export": "error",
      "@typescript-eslint/parameter-properties": "error",
      "@typescript-eslint/prefer-enum-initializers": "error",
      "@typescript-eslint/prefer-readonly": "error",
      "@typescript-eslint/promise-function-async": "error",
      "@typescript-eslint/require-array-sort-compare": "error",
      "@typescript-eslint/switch-exhaustiveness-check": "error",

      "no-loop-func": "off",
      "@typescript-eslint/no-loop-func": "error",

      "init-declarations": "off",
      "@typescript-eslint/init-declarations": "error",

      "class-methods-use-this": "off",
      "@typescript-eslint/class-methods-use-this": "error",

      "no-shadow": "off",
      "@typescript-eslint/no-shadow": "error",

      // unicorn
      "unicorn/prevent-abbreviations": "off",
      "unicorn/filename-case": "off",
      "unicorn/no-keyword-prefix": "off",
    },
  },
)

export { base, baseOverride }
