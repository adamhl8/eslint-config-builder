import type { BaseConfig, Config } from "../utils.js"

// @ts-expect-error does not include types
import promise from "eslint-plugin-promise"

const promiseConfig: Config = {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion, @typescript-eslint/no-unsafe-member-access
  extends: [promise.configs["flat/recommended"] as BaseConfig],
  rules: {
    // additional rules
    "promise/avoid-new": "error",
    "promise/no-multiple-resolved": "error",
    "promise/prefer-await-to-callbacks": "error",
    "promise/prefer-await-to-then": "error",
    "promise/prefer-catch": "error",
  },
}

export { promiseConfig }
