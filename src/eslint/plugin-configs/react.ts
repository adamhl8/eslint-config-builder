import type { Config } from "../utils.js"

import react from "eslint-plugin-react"
import globals from "globals"

const reactConfig: Config = {
  // @ts-expect-error not undefined
  extends: [react.configs.flat.recommended, react.configs.flat["jsx-runtime"]],
  ignores: ["**/*.astro"],
  languageOptions: {
    globals: globals.browser,
  },
  settings: {
    react: {
      version: "detect",
    },
  },
  rules: {
    // additional rules
    "react/button-has-type": "error",
  },
}

export { reactConfig }
