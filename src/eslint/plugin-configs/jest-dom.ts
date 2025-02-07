import jestDom from "eslint-plugin-jest-dom"

import { buildConfig } from "../utils.js"

const jestDomConfig = buildConfig({
  name: "jest-dom",
  extends: [jestDom.configs["flat/recommended"]],
})

export { jestDomConfig }
