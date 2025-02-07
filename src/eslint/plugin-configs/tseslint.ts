import tseslint from "typescript-eslint"

import { buildConfig } from "../utils.js"

const tseslintConfig = buildConfig({
  name: "typescript-eslint",
  extends: [
    tseslint.configs.strictTypeChecked,
    tseslint.configs.stylisticTypeChecked,
    tseslint.configs.eslintRecommended,
  ],
  rules: {
    // modifications to rules that are already turned on in the extended configs
    "@typescript-eslint/no-confusing-void-expression": [
      "error",
      {
        ignoreArrowShorthand: true,
      },
    ],

    // additional rules
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
    "@typescript-eslint/no-loop-func": "error",
    "@typescript-eslint/class-methods-use-this": "error",
    "@typescript-eslint/no-shadow": "error",
  },
})

export { tseslintConfig }
