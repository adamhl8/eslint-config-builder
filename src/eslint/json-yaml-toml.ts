import type { ConfigWithExtends as TSESLintConfig } from "typescript-eslint"

import json from "@eslint/json"
import toml from "eslint-plugin-toml"
import yaml from "eslint-plugin-yml"
import tseslint from "typescript-eslint"

const jsonConfig = tseslint.config(
  {
    extends: [json.configs.recommended],
    files: ["**/*.json"],
    ignores: ["package-lock.json"],
    language: "json/json",
  },
  {
    extends: [json.configs.recommended],
    files: ["**/*.jsonc"],
    language: "json/jsonc",
  },
  {
    extends: [json.configs.recommended],
    files: ["**/*.json5"],
    language: "json/json5",
  },
)

const yamlConfig = tseslint.config(
  {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion
    extends: [yaml.configs["flat/standard"] as TSESLintConfig],
    rules: {
      "yml/file-extension": "error",
      "yml/require-string-key": "error",
    },
  },
  // eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion
  yaml.configs["flat/prettier"] as TSESLintConfig,
)

// https://github.com/ota-meshi/eslint-plugin-toml/issues/245
// eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion
const tomlConfig = tseslint.config(toml.configs["flat/standard"] as TSESLintConfig)

const jsonYamlToml = tseslint.config(jsonConfig, yamlConfig, tomlConfig)

/**
 * We need to ignore all JSON, YAML, and TOML files for the typescript-eslint configs or else they will throw errors.
 */
const jsonYamlTomlIgnores = [
  ...new Set(
    jsonYamlToml
      .map((config) => config.files)
      .flat(Infinity)
      .filter((pattern) => typeof pattern === "string"),
  ),
]

export { jsonYamlToml, jsonYamlTomlIgnores }
