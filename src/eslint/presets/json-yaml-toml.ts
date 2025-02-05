import tseslint from "typescript-eslint"

import { eslintJsonConfig } from "../plugin-configs/eslint-json.js"
import { tomlConfig } from "../plugin-configs/toml.js"
import { ymlConfig } from "../plugin-configs/yml.js"

const jsonYamlTomlPreset = tseslint.config(eslintJsonConfig, ymlConfig, tomlConfig)

export { jsonYamlTomlPreset }
