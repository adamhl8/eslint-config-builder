import type { BaseConfig, Config } from "../utils.js"

import toml from "eslint-plugin-toml"

const tomlConfig: Config = {
  // https://github.com/ota-meshi/eslint-plugin-toml/issues/245
  // eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion
  extends: [toml.configs["flat/standard"] as BaseConfig],
  rules: {},
}

export { tomlConfig }
