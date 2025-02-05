import type { Config } from "../utils.js"

import testingLibrary from "eslint-plugin-testing-library"

const testingLibraryConfig: Config = {
  extends: [testingLibrary.configs["flat/react"]],
  files: ["**/?(*.)+(spec|test).[jt]s?(x)"],
  rules: {
    // additional rules
    "testing-library/prefer-implicit-assert": "error",
    "testing-library/prefer-user-event": "error",
  },
}

export { testingLibraryConfig }
