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
import { buildConfig, type ConfigRules, type RuleEntry, type StrictConfig } from "../src/eslint/utils.js"

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
  /*
  An "additional config" in this context is the last config in the array which contains *our* additional config properties.
  The only way to tell if there is our additional config exists is to check if the name ends with `ESLINT_CONFIG_BUILDER_SUFFIX`.
  If it doesn't, the last config is the one from the plugin that was extended.

  It is technically possible for the configs array to have only one config and it be our additional config,
  which is why we can't assume that a configs array with a length of 1 only has a config from the plugin.
  */

  const lastConfig = configs.at(-1)
  // the config name from the additional config should be the "friendly" name we set in the config object
  // otherwise, if it's not an additional config it's whatever the plugin set
  let configName = lastConfig?.name ?? "UNKNOWN"
  const additionalConfig = configName.endsWith(ESLINT_CONFIG_BUILDER_SUFFIX) ? lastConfig : undefined
  // remove the suffix so it looks nice in the test output
  configName = configName.replace(ESLINT_CONFIG_BUILDER_SUFFIX, "").trim()

  // edge case: there's only one config and it's an additional config, `extendedConfigs` will be an empty array since that config is on `additionalConfig`
  // if there's an additional config, we want all but the last config
  // if there's no additional config, we just use the original array
  let extendedConfigs: StrictConfig[]
  if (configs.length === 1 && additionalConfig) extendedConfigs = []
  // Array.slice(0, -1) returns an empty array if the array has only one element, so we just use the original array in that case
  else if (additionalConfig) extendedConfigs = configs.length > 1 ? configs.slice(0, -1) : configs
  else extendedConfigs = configs

  const rules: ConfigRules = {}
  for (const extendedConfig of extendedConfigs) {
    Object.assign(rules, buildConfigRules(extendedConfig))
  }

  const additionalRules = additionalConfig ? buildConfigRules(additionalConfig) : {}

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
 *
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
      const duplicateRules: string[] = []
      for (const [additionalRuleName, additionalRuleSetting] of Object.entries(additionalRules)) {
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
