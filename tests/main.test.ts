import type { Config, ConfigRules, RuleEntry } from "../src/eslint/utils.js"

import { inspect } from "node:util"
import { describe, expect, it } from "bun:test"
import tseslint from "typescript-eslint"

import { astroConfig } from "../src/eslint/plugin-configs/astro.js"
import { cypressConfig } from "../src/eslint/plugin-configs/cypress.js"
import { eslintJsonConfig } from "../src/eslint/plugin-configs/eslint-json.js"
import { eslintJsConfig } from "../src/eslint/plugin-configs/eslintJs.js"
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

interface RuleSet {
  rules: ConfigRules
  additionalRules: ConfigRules
}

const getRules = (config: Config): RuleSet => {
  const { extends: extendedConfigs, rules: additionalRules } = config
  const extendedConfigsArray = tseslint.config(extendedConfigs)

  const rules: ConfigRules = {}
  for (const configObject of extendedConfigsArray) {
    for (const [rule, value] of Object.entries(configObject.rules ?? {})) {
      rules[rule] = value
    }
  }

  return {
    rules,
    additionalRules,
  }
}

const ruleSets = {
  astro: getRules(astroConfig),
  cypress: getRules(cypressConfig),
  eslintJson: getRules(eslintJsonConfig),
  eslintJs: getRules(eslintJsConfig),
  jestDom: getRules(jestDomConfig),
  jsdoc: getRules(jsdocConfig),
  jsxA11y: getRules(jsxA11yConfig),
  promise: getRules(promiseConfig),
  reactCompiler: getRules(reactCompilerConfig),
  reactHooks: getRules(reactHooksConfig),
  reactRefresh: getRules(reactRefreshConfig),
  react: getRules(reactConfig),
  regexp: getRules(regexpConfig),
  sonarjs: getRules(sonarjsConfig),
  tailwind: getRules(tailwindConfig),
  testingLibrary: getRules(testingLibraryConfig),
  toml: getRules(tomlConfig),
  tseslint: getRules(tseslintConfig),
  unicorn: getRules(unicornConfig),
  vitest: getRules(vitestConfig),
  yml: getRules(ymlConfig),
} satisfies Record<string, RuleSet>

const ruleSetsEntries = Object.entries(ruleSets)

interface RuleInstance {
  ruleName: string
  setting: RuleEntry
}

/**
 * @example
 * ```
 * {
 *   "no-var": {
 *     "eslintJs": [{ "ruleName": "no-var", "setting": "error" }]
 *     "tseslint": [{ "ruleName": "no-var", "setting": "off" }, { "ruleName": "@typescript-eslint/no-var", "setting": "error" }]
 *   }
 * }
 * ```
 */
type BaseRulesByPlugin = Record<string, Record<string, RuleInstance[]>>

describe("main", () => {
  it.each(ruleSetsEntries)(
    "(%s) should not define rules that are already defined in the extended configs",
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
      "eslintJson",
      "toml",
      "yml",
    ])

    const ignoredRules = new Set([
      "unicorn/no-lonely-if", // adds to eslintJs rule: https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/no-lonely-if.md
      "unicorn/prefer-spread", // adds to eslintJs rule: https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-spread.md
      "unicorn/prefer-includes", // adds to tseslint rule
      "regexp/no-octal", // unrelated to eslintJs rule: https://ota-meshi.github.io/eslint-plugin-regexp/rules/no-octal.html
      "react/no-deprecated", // tseslint rule by the same name is unrelated
      "react/no-namespace", // tseslint rule by the same name is unrelated
    ])

    const baseRulesByPlugin: BaseRulesByPlugin = {}

    // Build up the conflicting rules object
    for (const [pluginName, { rules, additionalRules }] of ruleSetsEntries) {
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

    expect(conflicts, conflictMessages.join("\n\n")).toEqual([])
  })
})

function getPluginBaseRuleName(fullPluginRuleName: string) {
  if (!fullPluginRuleName.includes("/")) return fullPluginRuleName
  const pluginRuleNameParts = fullPluginRuleName.split("/")

  const pluginRuleName = pluginRuleNameParts.pop()
  if (!pluginRuleName) throw new Error(`Invalid rule name: ${fullPluginRuleName}`)
  return pluginRuleName
}

function stringify(value: unknown) {
  // eslint-disable-next-line unicorn/no-null
  return inspect(value, { depth: null, colors: true, maxArrayLength: null, maxStringLength: null })
}
