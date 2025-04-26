import prettier from "eslint-config-prettier"
import globals from "globals"
import tseslint from "typescript-eslint"

import { astroPreset } from "./presets/astro.js"
import { jsonYamlTomlPreset } from "./presets/json-yaml-toml.js"
import { reactPreset } from "./presets/react.js"
import { testingPreset } from "./presets/testing.js"
import { typescriptPreset } from "./presets/typescript.js"
import { buildConfig, type StrictConfig } from "./utils.js"

const prettierConfig = buildConfig({
  name: "prettier",
  extends: [prettier],
})

// These are language options we want to apply to all configs
const tsLanguageOptionsConfig: StrictConfig = {
  name: "typescript-language-options (eslint-config-builder)",
  languageOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    parserOptions: {
      projectService: true,
    },
    globals: globals.node,
  },
}

// The typescript preset is always included in the final config, so we don't specify it here
const presets = {
  astro: astroPreset,
  jsonYamlToml: jsonYamlTomlPreset,
  react: reactPreset,
  testing: testingPreset,
} as const

type PresetName = keyof typeof presets

class ESLintConfigBuilder {
  readonly #configs: StrictConfig[] = []
  readonly #enabledPresets = new Set<string>()

  public astro() {
    this.#addPreset("astro")
    return this
  }

  public jsonYamlToml() {
    this.#addPreset("jsonYamlToml")
    return this
  }

  public react() {
    this.#addPreset("react")
    return this
  }

  public tailwind() {
    // noop until eslint-plugin-tailwindcss is updated for tailwind v4
    return this
  }

  public testing() {
    this.#addPreset("testing")
    return this
  }

  #addPreset(presetName: PresetName) {
    if (!this.#enabledPresets.has(presetName)) {
      this.#enabledPresets.add(presetName)
      this.#configs.push(...presets[presetName])
    }
  }

  public build() {
    return tseslint.config(typescriptPreset, this.#configs, prettierConfig, tsLanguageOptionsConfig)
  }
}

export { ESLintConfigBuilder }
