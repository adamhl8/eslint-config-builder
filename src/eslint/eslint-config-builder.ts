import type { StrictConfig } from "./utils.js"

import prettier from "eslint-config-prettier"
import globals from "globals"
import tseslint from "typescript-eslint"

import { astroPreset } from "./presets/astro.js"
import { jsonYamlTomlPreset } from "./presets/json-yaml-toml.js"
import { reactPreset } from "./presets/react.js"
import { testingPreset } from "./presets/testing.js"
import { typescriptPreset } from "./presets/typescript.js"
import { buildConfig } from "./utils.js"

const prettierConfig = buildConfig({
  name: "prettier",
  extends: [prettier],
})

// These are language options we want to apply to all configs
const tsLanguageOptionsConfig: StrictConfig = {
  name: "typescript-language-options (@adamhl8/ts-project-configs)",
  languageOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    parserOptions: {
      projectService: true,
    },
    globals: globals.node,
  },
}

class ESLintConfigBuilder {
  readonly #configs: StrictConfig[] = []

  public astro() {
    this.#addConfig(astroPreset)
    return this
  }

  public jsonYamlToml() {
    this.#addConfig(jsonYamlTomlPreset)
    return this
  }

  public react() {
    this.#addConfig(reactPreset)
    return this
  }

  public tailwind() {
    // noop until eslint-plugin-tailwindcss is updated for tailwind v4
    return this
  }

  public testing() {
    this.#addConfig(testingPreset)
    return this
  }

  #addConfig(configs: StrictConfig[]) {
    this.#configs.push(...configs)
  }

  public build() {
    return tseslint.config(typescriptPreset, this.#configs, prettierConfig, tsLanguageOptionsConfig)
  }
}

export { ESLintConfigBuilder }
