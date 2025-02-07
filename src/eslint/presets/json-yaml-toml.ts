import { eslintJsonConfig } from "../plugin-configs/eslint-json.js"
import { tomlConfig } from "../plugin-configs/toml.js"
import { ymlConfig } from "../plugin-configs/yml.js"
import { buildConfig } from "../utils.js"

const jsonYamlTomlPreset = buildConfig({
  name: "json-yaml-toml-preset",
  extends: [eslintJsonConfig, ymlConfig, tomlConfig],
})

export { jsonYamlTomlPreset }
