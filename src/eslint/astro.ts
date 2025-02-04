import astro from "eslint-plugin-astro"
import globals from "globals"
import tseslint from "typescript-eslint"

import { jsxA11yExtraRules } from "./shared/jsx-a11y-extra-rules.js"

const astroBaseConfig = tseslint.config({
  extends: [astro.configs["flat/recommended"]],
  rules: {
    "astro/no-set-html-directive": "error",
    "astro/no-set-text-directive": "error",
    "astro/no-unused-css-selector": "error",
    "astro/prefer-class-list-directive": "error",
    "astro/prefer-object-class-list": "error",
    "astro/prefer-split-class-list": "error",
  },
})

// https://github.com/ota-meshi/eslint-plugin-astro/issues/466
// eslint-plugin-astro defines the "jsx-a11y" plugin which conflicts with the original plugin
// The last config object in astro.configs["flat/jsx-a11y-strict"] is the one that defines the "jsx-a11y" plugin
const baseAstroJsxA11yConfig = astro.configs["flat/jsx-a11y-strict"].slice(0, -1)
// We then grab that last config so we can get the rules and the plugin object
const astroJsxA11yPluginConfig = astro.configs["flat/jsx-a11y-strict"].pop()
const astroJsxA11yPlugin = astroJsxA11yPluginConfig?.plugins?.["jsx-a11y"] ?? {}
const astroJsxA11yRules = astroJsxA11yPluginConfig?.rules ?? {}
const fixedAstroJsxA11yConfig = tseslint.config({
  extends: [baseAstroJsxA11yConfig],
  plugins: {
    "astro/jsx-a11y": astroJsxA11yPlugin,
  },
  rules: astroJsxA11yRules,
})

const jsxA11yExtraRulesEntries = Object.entries(jsxA11yExtraRules)
const astroJsxA11yExtraRules = Object.fromEntries(
  jsxA11yExtraRulesEntries.map(([rule, value]) => [`astro/${rule}`, value]),
)

const astroJsxA11yConfig = tseslint.config({
  extends: [fixedAstroJsxA11yConfig],
  rules: astroJsxA11yExtraRules,
})

const astroConfig = tseslint.config({
  extends: [astroBaseConfig, astroJsxA11yConfig],
  languageOptions: {
    globals: globals.browser,
  },
})

export { astroConfig }
