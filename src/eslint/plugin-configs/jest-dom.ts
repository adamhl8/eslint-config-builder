import type { Config } from "../utils.js"

import jestDom from "eslint-plugin-jest-dom"

const jestDomConfig: Config = {
  extends: [jestDom.configs["flat/recommended"]],
  files: ["**/?(*.)+(spec|test).[jt]s?(x)"],
  rules: {},
}

export { jestDomConfig }
