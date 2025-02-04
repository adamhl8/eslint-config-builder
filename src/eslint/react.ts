import type { ConfigWithExtends as TSESLintConfig } from "typescript-eslint"

import jsxA11y from "eslint-plugin-jsx-a11y"
import react from "eslint-plugin-react"
// @ts-expect-error https://github.com/facebook/react/issues/30119
import reactCompiler from "eslint-plugin-react-compiler"
// @ts-expect-error https://github.com/facebook/react/issues/30119
import reactHooks from "eslint-plugin-react-hooks"
import reactRefresh from "eslint-plugin-react-refresh"
import globals from "globals"
import tseslint from "typescript-eslint"

import { jsxA11yExtraRules } from "./shared/jsx-a11y-extra-rules.js"

const reactBaseConfig = tseslint.config({
  // @ts-expect-error not undefined
  // the 'recommended' config enables very few rules so we use 'all' instead
  extends: [react.configs.flat.all, react.configs.flat["jsx-runtime"]],
})

const reactHooksFlat = {
  // reactHooks hasn't been updated to use the new eslint flat config format
  // This object restructures the rules and plugin to be compatible with the new format

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
  plugins: { "react-hooks": { rules: reactHooks.rules } },
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
  rules: reactHooks.configs.recommended.rules,
}

const reactHooksConfig = tseslint.config(reactHooksFlat)

// eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion, @typescript-eslint/no-unsafe-member-access
const reactCompilerConfig = tseslint.config(reactCompiler.configs.recommended as TSESLintConfig)

const reactRefreshConfig = tseslint.config(reactRefresh.configs.recommended)

const jsxA11yConfig = tseslint.config({
  extends: [jsxA11y.flatConfigs.strict],
  rules: jsxA11yExtraRules,
})

const reactConfig = tseslint.config({
  extends: [reactBaseConfig, reactHooksConfig, reactCompilerConfig, reactRefreshConfig, jsxA11yConfig],
  ignores: ["**/*.astro"],
  languageOptions: {
    globals: globals.browser,
  },
  settings: {
    react: {
      version: "detect",
    },
  },
})

export { reactConfig }
