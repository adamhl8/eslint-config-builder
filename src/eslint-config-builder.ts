import type { TSESLint } from "@typescript-eslint/utils"

import tseslint from "typescript-eslint"

import { astro } from "./eslint/astro.js"
import { base, baseOverride } from "./eslint/base.js"
import { react } from "./eslint/react.js"
import { testing } from "./eslint/testing.js"

class ESLintConfigBuilder {
  readonly #configs: TSESLint.FlatConfig.ConfigArray[] = []

  public astro() {
    this.#configs.push(astro)
    return this
  }

  public react() {
    this.#configs.push(react)
    return this
  }

  public testing() {
    this.#configs.push(testing)
    return this
  }

  public build() {
    return tseslint.config(base, ...this.#configs, baseOverride)
  }
}

export { ESLintConfigBuilder }
