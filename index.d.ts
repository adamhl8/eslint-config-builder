import type { TSESLint } from "@typescript-eslint/utils"
import type { Config as PrettierConfig } from "prettier"

export declare const eslintConfigs: {
  astro: TSESLint.FlatConfig.ConfigArray
  base: TSESLint.FlatConfig.ConfigArray
  react: TSESLint.FlatConfig.ConfigArray
  testing: TSESLint.FlatConfig.ConfigArray
}
export declare const prettierConfig: PrettierConfig
