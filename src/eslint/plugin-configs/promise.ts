// @ts-expect-error does not include types
import promise from "eslint-plugin-promise"

import { buildConfig } from "../utils.js"

const promiseConfig = buildConfig({
  name: "promise",
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
  extends: [promise.configs["flat/recommended"]],
  rules: {
    // additional rules
    "promise/avoid-new": "error",
    "promise/no-multiple-resolved": "error",
    "promise/prefer-await-to-callbacks": "error",
    "promise/prefer-await-to-then": "error",
    "promise/prefer-catch": "error",
  },
})

export { promiseConfig }
