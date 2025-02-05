import type { Config } from "../utils.js"

import jsxA11y from "eslint-plugin-jsx-a11y"

const jsxA11yConfig: Config = {
  extends: [jsxA11y.flatConfigs.strict],
  rules: {
    // additional rules
    "jsx-a11y/lang": "error",
    "jsx-a11y/prefer-tag-over-role": "error",
  },
}

export { jsxA11yConfig }
