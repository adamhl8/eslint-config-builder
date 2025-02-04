import type { ConfigArray } from "typescript-eslint"

import tseslint from "typescript-eslint"

import { astroConfig } from "./eslint/astro.js"
import { baseConfig, languageOptionsConfig } from "./eslint/base.js"
import { reactConfig } from "./eslint/react.js"
import { testingConfig } from "./eslint/testing.js"

class ESLintConfigBuilder {
  readonly #configs: ConfigArray[] = []

  public astro() {
    this.#configs.push(astroConfig)
    return this
  }

  public react() {
    this.#configs.push(reactConfig)
    return this
  }

  public tailwind() {
    // noop until eslint-plugin-tailwindcss is updated for tailwind v4
    return this
  }

  public testing() {
    this.#configs.push(testingConfig)
    return this
  }

  public build() {
    return tseslint.config(baseConfig, this.#configs, languageOptionsConfig)
  }
}

export { ESLintConfigBuilder }
