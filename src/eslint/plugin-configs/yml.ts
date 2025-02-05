import type { BaseConfig, Config } from "../utils.js"

import yml from "eslint-plugin-yml"

const ymlConfig: Config = {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion
  extends: [yml.configs["flat/standard"] as BaseConfig, yml.configs["flat/prettier"] as BaseConfig],
  rules: {
    // additional rules
    "yml/file-extension": "error",
    "yml/require-string-key": "error",
  },
}

export { ymlConfig }
