import type { ConfigArray } from "typescript-eslint"

import type { Config } from "./utils.js"

import prettier from "eslint-config-prettier"
import globals from "globals"
import tseslint from "typescript-eslint"

import { astroConfig } from "./plugin-configs/astro.js"
import { jsonYamlTomlPreset } from "./presets/json-yaml-toml.js"
import { reactPreset } from "./presets/react.js"
import { testingPreset } from "./presets/testing.js"
import { typescriptPreset } from "./presets/typescript.js"

// These are language options we want to apply to all configs
const tsLanguageOptionsConfig = tseslint.config(prettier, {
  languageOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    parserOptions: {
      projectService: true,
    },
    globals: globals.node,
  },
})

class ESLintConfigBuilder {
  readonly #configs: (Config | ConfigArray)[] = []

  public astro() {
    this.#configs.push(astroConfig)
    return this
  }

  public jsonYamlToml() {
    this.#configs.push(jsonYamlTomlPreset)
    return this
  }

  public react() {
    this.#configs.push(reactPreset)
    return this
  }

  public tailwind() {
    // noop until eslint-plugin-tailwindcss is updated for tailwind v4
    return this
  }

  public testing() {
    this.#configs.push(testingPreset)
    return this
  }

  public build() {
    return tseslint.config(typescriptPreset, this.#configs, tsLanguageOptionsConfig)
  }
}

export { ESLintConfigBuilder }
