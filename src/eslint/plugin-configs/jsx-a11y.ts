import jsxA11y from "eslint-plugin-jsx-a11y"

import { buildConfig } from "../utils.js"

const jsxA11yConfig = buildConfig({
  name: "jsx-a11y",
  extends: [jsxA11y.flatConfigs.strict],
  rules: {
    // additional rules
    "jsx-a11y/lang": "error",
    "jsx-a11y/prefer-tag-over-role": "error",
  },
})

export { jsxA11yConfig }
