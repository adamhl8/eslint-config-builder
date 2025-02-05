import type { BaseConfig, Config } from "../utils.js"

import json from "@eslint/json"

const jsonConfig: BaseConfig = {
  extends: [json.configs.recommended],
  files: ["**/*.json"],
  ignores: ["package-lock.json"],
  language: "json/json",
}

const jsoncConfig: BaseConfig = {
  extends: [json.configs.recommended],
  files: ["**/*.jsonc"],
  language: "json/jsonc",
}

const json5Config: BaseConfig = {
  extends: [json.configs.recommended],
  files: ["**/*.json5"],
  language: "json/json5",
}

const eslintJsonConfig: Config = {
  extends: [jsonConfig, jsoncConfig, json5Config],
  rules: {},
}

export { eslintJsonConfig }
