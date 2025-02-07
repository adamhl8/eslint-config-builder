import type { ConfigRules, RuleEntry, StrictConfig } from "../src/eslint/utils.js"

import { inspect } from "bun"
import { describe, expect, it } from "bun:test"
import prettier from "eslint-config-prettier"

import { astroConfig } from "../src/eslint/plugin-configs/astro.js"
import { cypressConfig } from "../src/eslint/plugin-configs/cypress.js"
import { eslintJsConfig } from "../src/eslint/plugin-configs/eslint-js.js"
import { eslintJsonConfig } from "../src/eslint/plugin-configs/eslint-json.js"
import { jestDomConfig } from "../src/eslint/plugin-configs/jest-dom.js"
import { jsdocConfig } from "../src/eslint/plugin-configs/jsdoc.js"
import { jsxA11yConfig } from "../src/eslint/plugin-configs/jsx-a11y.js"
import { promiseConfig } from "../src/eslint/plugin-configs/promise.js"
import { reactCompilerConfig } from "../src/eslint/plugin-configs/react-compiler.js"
import { reactHooksConfig } from "../src/eslint/plugin-configs/react-hooks.js"
import { reactRefreshConfig } from "../src/eslint/plugin-configs/react-refresh.js"
import { reactConfig } from "../src/eslint/plugin-configs/react.js"
import { regexpConfig } from "../src/eslint/plugin-configs/regexp.js"
import { sonarjsConfig } from "../src/eslint/plugin-configs/sonarjs.js"
import { tailwindConfig } from "../src/eslint/plugin-configs/tailwind.js"
import { testingLibraryConfig } from "../src/eslint/plugin-configs/testing-library.js"
import { tomlConfig } from "../src/eslint/plugin-configs/toml.js"
import { tseslintConfig } from "../src/eslint/plugin-configs/tseslint.js"
import { unicornConfig } from "../src/eslint/plugin-configs/unicorn.js"
import { vitestConfig } from "../src/eslint/plugin-configs/vitest.js"
import { ymlConfig } from "../src/eslint/plugin-configs/yml.js"
import { buildConfig } from "../src/eslint/utils.js"

interface RuleSet {
  name: string
  rules: ConfigRules
  additionalRules: ConfigRules
}

const pluginConfigs = [
  astroConfig,
  cypressConfig,
  eslintJsConfig,
  eslintJsonConfig,
  jestDomConfig,
  jsdocConfig,
  jsxA11yConfig,
  promiseConfig,
  reactCompilerConfig,
  reactHooksConfig,
  reactRefreshConfig,
  reactConfig,
  regexpConfig,
  sonarjsConfig,
  tailwindConfig,
  testingLibraryConfig,
  tomlConfig,
  tseslintConfig,
  unicornConfig,
  vitestConfig,
  ymlConfig,
]

const prettierConfig = buildConfig({
  name: "prettier",
  extends: [prettier],
})

const ESLINT_CONFIG_BUILDER_SUFFIX = "(eslint-config-builder)"

function convertRuleSettings(value: RuleEntry | undefined) {
  if (typeof value === "number") {
    if (value === 0) return "off"
    if (value === 1) return "warn"
    return "error"
  }
  if (value === undefined) return "off"
  return value
}

function buildConfigRules(config: StrictConfig) {
  const rules: ConfigRules = {}
  for (const [rule, value] of Object.entries(config.rules ?? {})) {
    rules[rule] = convertRuleSettings(value)
  }
  return rules
}

function getRules(configs: StrictConfig[]): RuleSet {
  let additionalConfig = configs.at(-1)
  if (!additionalConfig) throw new Error(`Failed to get last config from config array:\n${stringify(configs, 2)}`)

  // we know there's an additional config if the last config has the suffix
  const isAdditionalConfig = additionalConfig.name.endsWith(ESLINT_CONFIG_BUILDER_SUFFIX)
  const configName = additionalConfig.name.replace(ESLINT_CONFIG_BUILDER_SUFFIX, "").trim()

  // if there's no additional config, set additionalConfig to an empty config
  if (!isAdditionalConfig) additionalConfig = { name: configName }

  const additionalRules = buildConfigRules(additionalConfig)

  // TIL that Array.slice(0, -1) returns an empty array if the array has only one element
  const extendedConfigs = configs.length > 1 ? configs.slice(0, -1) : configs
  const rules: ConfigRules = {}
  for (const extendedConfig of extendedConfigs) {
    Object.assign(rules, buildConfigRules(extendedConfig))
  }

  return {
    name: configName,
    rules,
    additionalRules,
  }
}

const prettierConfigRules = getRules(prettierConfig).rules

const ruleSets = pluginConfigs.map((configs) => {
  const { name, rules, additionalRules } = getRules(configs)
  return [name, { rules, additionalRules }] as const
})

interface RuleInstance {
  ruleName: string
  setting: RuleEntry
}

/**
 * @example
 * ```
 * {
 *   "no-var": {
 *     "eslint-js": [{ "ruleName": "no-var", "setting": "error" }]
 *     "tseslint": [{ "ruleName": "no-var", "setting": "off" }, { "ruleName": "@typescript-eslint/no-var", "setting": "error" }]
 *   }
 * }
 * ```
 */
type BaseRulesByPlugin = Record<string, Record<string, RuleInstance[]>>

describe("main", () => {
  it.each(ruleSets)(
    "(%s) should not define rules that are already defined in its extended configs",
    (name, { rules, additionalRules }) => {
      const ignoredRules = new Set([
        "complexity", // covered by sonarjs/cognitive-complexity
      ])

      const duplicateRules: string[] = []
      for (const [additionalRuleName, additionalRuleSetting] of Object.entries(additionalRules)) {
        if (ignoredRules.has(additionalRuleName)) continue

        const ruleSetting = rules[additionalRuleName]

        // if the additional rule setting is off and the rule setting is undefined, it means we're turning off a rule that is already off
        if (additionalRuleSetting === "off" && !ruleSetting) {
          duplicateRules.push(additionalRuleName)
          continue
        }

        // if the additional rule setting is the same as the rule setting, it's a duplicate
        if (additionalRuleSetting === ruleSetting) duplicateRules.push(additionalRuleName)
      }

      const errorMessage = duplicateRules
        .map(
          (additionalRuleName) =>
            `The '${name}' config defines the additional rule '${additionalRuleName}: ${additionalRules[additionalRuleName]?.toString() ?? "undefined"}' which is already defined in the extended configs as '${rules[additionalRuleName]?.toString() ?? "undefined (off)"}'`,
        )
        .join("\n")

      expect(duplicateRules, errorMessage).toEqual([])
    },
  )

  // eslint-disable-next-line sonarjs/cognitive-complexity
  it("plugins should not have conflicting rules", () => {
    const ignoredRuleSets = new Set([
      "astro", // always astro specific, there's nothing to turn off
      "eslint-json",
      "toml",
      "yml",
    ])

    const ignoredRules = new Set([
      "unicorn/no-lonely-if", // adds to eslint-js rule: https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/no-lonely-if.md
      "unicorn/prefer-spread", // adds to eslint-js rule: https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-spread.md
      "unicorn/prefer-includes", // adds to tseslint rule
      "regexp/no-octal", // unrelated to eslint-js rule: https://ota-meshi.github.io/eslint-plugin-regexp/rules/no-octal.html
      "react/no-deprecated", // tseslint rule by the same name is unrelated
      "react/no-namespace", // tseslint rule by the same name is unrelated
    ])

    const baseRulesByPlugin: BaseRulesByPlugin = {}

    // Build up the conflicting rules object
    for (const [pluginName, { rules, additionalRules }] of ruleSets) {
      if (ignoredRuleSets.has(pluginName)) continue

      const pluginRules = {
        ...rules,
        ...additionalRules,
      }

      for (const [ruleName, setting] of Object.entries(pluginRules)) {
        if (ignoredRules.has(ruleName)) continue

        const baseRuleName = getPluginBaseRuleName(ruleName)

        baseRulesByPlugin[baseRuleName] ??= {}

        baseRulesByPlugin[baseRuleName][pluginName] ??= []

        baseRulesByPlugin[baseRuleName][pluginName].push({
          ruleName,
          setting,
        })
      }
    }

    // Check for conflicts
    const conflicts: string[] = []
    const conflictMessages: string[] = []

    for (const [baseRuleName, pluginsWithRule] of Object.entries(baseRulesByPlugin)) {
      let activeRules = 0

      // Find all active (non-off) rules
      for (const ruleInstances of Object.values(pluginsWithRule)) {
        for (const { setting } of ruleInstances) {
          if (setting !== "off") activeRules++
        }
      }

      // If more than one active rule, we have a conflict
      if (activeRules > 1) {
        conflicts.push(baseRuleName)

        const baseRuleObjectString = stringify(baseRulesByPlugin[baseRuleName])
        conflictMessages.push(`---\nRule '${baseRuleName}' has conflicts:\n\n${baseRuleObjectString}\n---`)
      }
    }

    expect(conflicts, `\n${conflictMessages.join("\n\n")}`).toEqual([])
  })

  it.each(ruleSets)("(%s) should not define rules that are turned off by prettier", (name, { additionalRules }) => {
    const conflictingRules: string[] = []

    for (const ruleName of Object.keys(additionalRules)) {
      const prettierSetting = prettierConfigRules[ruleName]
      if (prettierSetting === "off") conflictingRules.push(ruleName)
    }

    const errorMessage = conflictingRules
      .map(
        (ruleName) =>
          `The '${name}' config defines the additional rule '${ruleName}: ${additionalRules[ruleName]?.toString() ?? "undefined"}' which is turned off by the prettier config`,
      )
      .join("\n")

    expect(conflictingRules, errorMessage).toEqual([])
  })
})

function getPluginBaseRuleName(fullPluginRuleName: string) {
  if (!fullPluginRuleName.includes("/")) return fullPluginRuleName
  const pluginRuleNameParts = fullPluginRuleName.split("/")

  const pluginRuleName = pluginRuleNameParts.pop()
  if (!pluginRuleName) throw new Error(`Invalid rule name: ${fullPluginRuleName}`)
  return pluginRuleName
}

function stringify(value: unknown, depth = Infinity) {
  return inspect(value, { colors: true, depth })
}
