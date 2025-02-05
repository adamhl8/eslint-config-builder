import type { BaseConfig, Config } from "../utils.js"

// @ts-expect-error does not include types
import cypress from "eslint-plugin-cypress/flat"

const cypressConfig: Config = {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion, @typescript-eslint/no-unsafe-member-access
  extends: [cypress.configs.recommended as BaseConfig],
  files: ["cypress/**/*"],
  rules: {
    // additional rules
    "cypress/assertion-before-screenshot": "error",
    "cypress/no-async-before": "error",
    "cypress/no-force": "error",
  },
}

export { cypressConfig }
