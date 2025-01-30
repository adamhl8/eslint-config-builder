import eslintJs from "@eslint/js"
import vitest from "@vitest/eslint-plugin"
import astro from "eslint-plugin-astro"
import react from "eslint-plugin-react"
// @ts-expect-error https://github.com/facebook/react/issues/30119
import reactCompiler from "eslint-plugin-react-compiler"
// @ts-expect-error https://github.com/facebook/react/issues/30119
import reactHooks from "eslint-plugin-react-hooks"
import reactRefresh from "eslint-plugin-react-refresh"
import sonarjs from "eslint-plugin-sonarjs"
import unicorn from "eslint-plugin-unicorn"
import globals from "globals"
import tseslint from "typescript-eslint"

/** @type {import('@typescript-eslint/utils').TSESLint.FlatConfig.Config} */
const reactHooksFlat = {
  // reactHooks hasn't been updated to use the new eslint flat config format
  // This object restructures the rules and plugin to be compatible with the new format

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
  plugins: { "react-hooks": { rules: reactHooks.rules } },
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
  rules: reactHooks.configs.recommended.rules,
}

/** @type {import('@typescript-eslint/utils').TSESLint.FlatConfig.Config} */
const reactCompilerFlat = {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
  plugins: { "react-compiler": { rules: reactCompiler.rules } },
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
  rules: reactCompiler.configs.recommended.rules,
}

const eslintConfig = tseslint.config(
  eslintJs.configs.recommended,
  tseslint.configs.strictTypeChecked,
  tseslint.configs.stylisticTypeChecked,
  unicorn.configs["flat/all"],
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  sonarjs.configs.recommended,
  // @ts-expect-error This is not undefined
  react.configs.flat.recommended,
  react.configs.flat["jsx-runtime"],
  reactHooksFlat,
  reactCompilerFlat,
  reactRefresh.configs.recommended,
  astro.configs["flat/all"],
  astro.configs["flat/jsx-a11y-strict"],
  { files: ["**/*.test.ts"], ...vitest.configs.all },
  {
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
      globals: {
        ...globals.node,
        ...globals.browser,
      },
    },
    settings: {
      react: {
        // https://github.com/DRD4-7R/eslint-config-7r-building/issues/1#issuecomment-473031376
        version: "999.999.999",
      },
    },
  },
  {
    rules: {
      "@typescript-eslint/no-confusing-void-expression": "off",
      "@typescript-eslint/consistent-type-imports": "error",
      "unicorn/prevent-abbreviations": "off",
      "astro/semi": "off",
      "astro/sort-attributes": "off",
    },
  },
)

export { eslintConfig }
export default eslintConfig
