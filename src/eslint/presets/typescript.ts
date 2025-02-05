import tseslint from "typescript-eslint"

import { eslintJsConfig } from "../plugin-configs/eslintJs.js"
import { jsdocConfig } from "../plugin-configs/jsdoc.js"
import { promiseConfig } from "../plugin-configs/promise.js"
import { regexpConfig } from "../plugin-configs/regexp.js"
import { sonarjsConfig } from "../plugin-configs/sonarjs.js"
import { tseslintConfig } from "../plugin-configs/tseslint.js"
import { unicornConfig } from "../plugin-configs/unicorn.js"
import { jsonYamlTomlPreset } from "../presets/json-yaml-toml.js"

/**
 * We need to ignore all JSON, YAML, and TOML files for these configs or else they will throw errors.
 */
const jsonYamlTomlIgnores = [
  ...new Set(
    jsonYamlTomlPreset
      .map((config) => config.files)
      .flat(Infinity)
      .filter((pattern) => typeof pattern === "string"),
  ),
]

const typescriptPreset = tseslint.config({
  extends: [eslintJsConfig, tseslintConfig, unicornConfig, sonarjsConfig, promiseConfig, regexpConfig, jsdocConfig],
  ignores: jsonYamlTomlIgnores,
})

export { typescriptPreset }
