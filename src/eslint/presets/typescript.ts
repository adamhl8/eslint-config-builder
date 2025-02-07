import { eslintJsConfig } from "../plugin-configs/eslint-js.js"
import { jsdocConfig } from "../plugin-configs/jsdoc.js"
import { promiseConfig } from "../plugin-configs/promise.js"
import { regexpConfig } from "../plugin-configs/regexp.js"
import { sonarjsConfig } from "../plugin-configs/sonarjs.js"
import { tseslintConfig } from "../plugin-configs/tseslint.js"
import { unicornConfig } from "../plugin-configs/unicorn.js"
import { buildConfig, jsonYamlTomlIgnores } from "../utils.js"

const typescriptPreset = buildConfig({
  name: "typescript-preset",
  extends: [eslintJsConfig, tseslintConfig, unicornConfig, sonarjsConfig, promiseConfig, regexpConfig, jsdocConfig],
  ignores: jsonYamlTomlIgnores,
})

export { typescriptPreset }
