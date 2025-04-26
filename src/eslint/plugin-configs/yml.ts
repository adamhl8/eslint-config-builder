import yml from "eslint-plugin-yml"

import { buildConfig, type FlatConfig } from "../utils.js"

const ymlConfig = buildConfig({
  name: "yml",
  // eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion
  extends: [yml.configs["flat/standard"] as FlatConfig, yml.configs["flat/prettier"] as FlatConfig],
  rules: {
    // additional rules
    "yml/file-extension": "error",
    "yml/require-string-key": "error",
  },
})

export { ymlConfig }
