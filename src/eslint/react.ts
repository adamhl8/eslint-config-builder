import jsxA11y from "eslint-plugin-jsx-a11y"
import react from "eslint-plugin-react"
// @ts-expect-error https://github.com/facebook/react/issues/30119
import reactCompiler from "eslint-plugin-react-compiler"
// @ts-expect-error https://github.com/facebook/react/issues/30119
import reactHooks from "eslint-plugin-react-hooks"
import reactRefresh from "eslint-plugin-react-refresh"
import globals from "globals"
import tseslint from "typescript-eslint"

/** @type {import("@typescript-eslint/utils").TSESLint.FlatConfig.Config} */
const reactHooksFlat = {
  // reactHooks hasn't been updated to use the new eslint flat config format
  // This object restructures the rules and plugin to be compatible with the new format

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
  plugins: { "react-hooks": { rules: reactHooks.rules } },
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
  rules: reactHooks.configs.recommended.rules,
}

/** @type {import("@typescript-eslint/utils").TSESLint.FlatConfig.Config} */
const reactCompilerFlat = {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
  plugins: { "react-compiler": { rules: reactCompiler.rules } },
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
  rules: reactCompiler.configs.recommended.rules,
}

const reactConfig = tseslint.config(
  {
    extends: [
      // @ts-expect-error not undefined
      react.configs.flat["all"],
      // @ts-expect-error not undefined
      react.configs.flat["jsx-runtime"],
      jsxA11y.flatConfigs.strict,
    ],
    ignores: ["**/*.astro"],
  },
  reactHooksFlat,
  reactCompilerFlat,
  reactRefresh.configs.recommended,
  {
    languageOptions: {
      globals: globals.browser,
    },
    settings: {
      react: {
        version: "detect",
      },
    },
  },
)

export { reactConfig as react }
