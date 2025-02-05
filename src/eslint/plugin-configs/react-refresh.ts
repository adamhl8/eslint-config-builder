import type { Config } from "../utils.js"

import reactRefresh from "eslint-plugin-react-refresh"
import globals from "globals"

const reactRefreshConfig: Config = {
  extends: [reactRefresh.configs.recommended],
  ignores: ["**/*.astro"],
  languageOptions: {
    globals: globals.browser,
  },
  settings: {
    react: {
      version: "detect",
    },
  },
  rules: {},
}

export { reactRefreshConfig }
