import json from "@eslint/json"

import { buildConfig } from "../utils.js"

const jsonConfig = buildConfig({
  name: "eslint-json",
  extends: [json.configs.recommended],
  files: ["**/*.json"],
  ignores: ["**/package-lock.json", "**/tsconfig.json", "**/tsconfig.*.json"],
  language: "json/json",
})

const jsoncConfig = buildConfig({
  name: "eslint-json",
  extends: [json.configs.recommended],
  files: ["**/*.jsonc"],
  language: "json/jsonc",
})

const json5Config = buildConfig({
  name: "eslint-json",
  extends: [json.configs.recommended],
  files: ["**/*.json5"],
  language: "json/json5",
})

const eslintJsonConfig = buildConfig({
  name: "eslint-json",
  extends: [jsonConfig, jsoncConfig, json5Config],
})

export { eslintJsonConfig }
