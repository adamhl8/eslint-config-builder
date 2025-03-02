import reactHooks from "eslint-plugin-react-hooks"
import globals from "globals"

import { buildConfig } from "../utils.js"

const reactHooksConfig = buildConfig({
  name: "react-hooks",
  extends: [reactHooks.configs["recommended-latest"]],
  languageOptions: {
    globals: globals.browser,
  },
  settings: {
    react: {
      version: "detect",
    },
  },
  rules: {
    // modifications to rules that are already turned on in the extended configs
    "react-hooks/exhaustive-deps": "error",
  },
})

export { reactHooksConfig }
