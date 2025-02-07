import type { FlatConfig } from "../utils.js"

import toml from "eslint-plugin-toml"

import { buildConfig } from "../utils.js"

const tomlConfig = buildConfig({
  name: "toml",
  // https://github.com/ota-meshi/eslint-plugin-toml/issues/245
  // eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion
  extends: [toml.configs["flat/standard"] as FlatConfig],
})

export { tomlConfig }
