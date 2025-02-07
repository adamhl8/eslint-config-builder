import astro from "eslint-plugin-astro"
import globals from "globals"

import { buildConfig } from "../utils.js"
import { jsxA11yConfig } from "./jsx-a11y.js"

// https://github.com/ota-meshi/eslint-plugin-astro/issues/466
// eslint-plugin-astro defines the "jsx-a11y" plugin which conflicts with the original plugin
// The last config object in astro.configs["flat/jsx-a11y-strict"] is the one that defines the "jsx-a11y" plugin
const baseAstroJsxA11yConfig = astro.configs["flat/jsx-a11y-strict"].slice(0, -1)
// We then grab that last config so we can get the rules and the plugin object
const astroJsxA11yPluginConfig = astro.configs["flat/jsx-a11y-strict"].pop()
const astroJsxA11yPlugin = astroJsxA11yPluginConfig?.plugins?.["jsx-a11y"] ?? {}
const astroJsxA11yRules = astroJsxA11yPluginConfig?.rules ?? {}
const fixedAstroJsxA11yConfig = buildConfig({
  name: "astro-jsx-a11y",
  extends: [baseAstroJsxA11yConfig],
  plugins: {
    "astro/jsx-a11y": astroJsxA11yPlugin,
  },
  rules: astroJsxA11yRules,
})

const jsxA11yAdditionalRules = jsxA11yConfig.at(-1)?.rules ?? {}
const jsxA11yAdditionalRulesEntries = Object.entries(jsxA11yAdditionalRules)
const astroJsxA11yAdditionalRules = Object.fromEntries(
  jsxA11yAdditionalRulesEntries.map(([rule, value]) => [`astro/${rule}`, value]),
)

const astroConfig = buildConfig({
  name: "astro",
  extends: [astro.configs["flat/recommended"], fixedAstroJsxA11yConfig],
  languageOptions: {
    globals: globals.browser,
  },
  rules: {
    // additional rules
    "astro/no-set-html-directive": "error",
    "astro/no-set-text-directive": "error",
    "astro/no-unused-css-selector": "error",
    "astro/prefer-class-list-directive": "error",
    "astro/prefer-object-class-list": "error",
    "astro/prefer-split-class-list": "error",
    ...astroJsxA11yAdditionalRules,
  },
})

export { astroConfig }
