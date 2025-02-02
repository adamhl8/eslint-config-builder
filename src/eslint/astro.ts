import astro from "eslint-plugin-astro"
import globals from "globals"
import tseslint from "typescript-eslint"

// https://github.com/ota-meshi/eslint-plugin-astro/issues/466
// eslint-plugin-astro defines the "jsx-a11y" plugin which conflicts with the original plugin
// The last config object in astro.configs["flat/jsx-a11y-strict"] is the one that defines the "jsx-a11y" plugin
const baseAstroJsxA11yConfig = astro.configs["flat/jsx-a11y-strict"].slice(0, -1)
// We then grab that last config so we can get the rules and the plugin object
const astroJsxA11yConfig = astro.configs["flat/jsx-a11y-strict"].pop()
const astroJsxA11yPlugin = astroJsxA11yConfig?.plugins?.["jsx-a11y"] ?? {}
const astroJsxA11yRules = astroJsxA11yConfig?.rules ?? {}

const astroConfig = tseslint.config(
  astro.configs["flat/all"],
  {
    extends: [baseAstroJsxA11yConfig],
    plugins: {
      "astro/jsx-a11y": astroJsxA11yPlugin,
    },
    rules: astroJsxA11yRules,
  },
  {
    languageOptions: {
      globals: globals.browser,
    },
  },
  {
    rules: {
      "astro/semi": "off",
      "astro/sort-attributes": "off",
    },
  },
)

export { astroConfig as astro }
