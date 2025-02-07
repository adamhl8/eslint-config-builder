// @ts-expect-error does not include types
import cypress from "eslint-plugin-cypress/flat"

import { buildConfig } from "../utils.js"

const cypressConfig = buildConfig({
  name: "cypress",
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
  extends: [cypress.configs.recommended],
  rules: {
    // additional rules
    "cypress/assertion-before-screenshot": "error",
    "cypress/no-async-before": "error",
    "cypress/no-force": "error",
  },
})

export { cypressConfig }
