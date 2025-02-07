import testingLibrary from "eslint-plugin-testing-library"

import { buildConfig } from "../utils.js"

const testingLibraryConfig = buildConfig({
  name: "testing-library",
  extends: [testingLibrary.configs["flat/react"]],
  rules: {
    // additional rules
    "testing-library/prefer-explicit-assert": "error",
    "testing-library/prefer-user-event": "error",
  },
})

export { testingLibraryConfig }
