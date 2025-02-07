import type { TSESLint } from "@typescript-eslint/utils"
import type { Simplify } from "type-fest"

import { jsonYamlTomlPreset } from "./presets/json-yaml-toml.js"

type FlatConfig = TSESLint.FlatConfig.Config
type InfiniteFlatConfig = FlatConfig | InfiniteFlatConfig[]
// every config should have a name
type StrictConfig = Simplify<FlatConfig & Required<Pick<FlatConfig, "name">>>
// We purposely don't use `ConfigWithExtends` from typescript-eslint because the extends property accepts an array of configs which themselves can have extends. We don't want that because we don't want to worry about unwrapping those nested extends.
type ConfigWithExtends = Simplify<StrictConfig & { extends: InfiniteFlatConfig[] }>

type RuleEntry = TSESLint.FlatConfig.RuleEntry
type RuleLevelAndOptions = TSESLint.FlatConfig.RuleLevelAndOptions
type SeverityString = TSESLint.FlatConfig.SeverityString
type ConfigRules = Record<string, RuleLevelAndOptions | SeverityString>

/**
 * @param config A ESLint config with extends
 * @returns An array of configs where any additional properties are added to all configs in the extends array
 * @description
 * This is our own version of tseslint's config helper: {@link https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/typescript-eslint/src/config-helper.ts}
 */
function buildConfig(config: ConfigWithExtends): StrictConfig[] {
  const { extends: extendsArray, name, files, ignores, ...rest } = config

  // @ts-expect-error fdsafdsafdsafdsa
  // eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion
  const flatExtends = extendsArray.flat(Infinity) as FlatConfig[]
  const extendedConfigs: StrictConfig[] = flatExtends.map((extendedConfig) => {
    const extendedConfigWithNewProperties: StrictConfig = {
      ...extendedConfig,
      name: extendedConfig.name?.length ? extendedConfig.name : name,
    }
    if (files) extendedConfigWithNewProperties.files = files
    if (ignores) extendedConfigWithNewProperties.ignores = ignores
    return extendedConfigWithNewProperties
  })

  const additionalConfig: StrictConfig = {
    ...rest,
    name: `${name} (eslint-config-builder)`,
  }
  if (files) additionalConfig.files = files
  if (ignores) additionalConfig.ignores = ignores

  const configs: StrictConfig[] = [...extendedConfigs, additionalConfig]

  const filteredConfigs = configs.filter((conf) => {
    const configKeys = Object.keys(conf)
    /*
    We only want to include configs that have at least one key that's not in the list of excluded keys.

    The following configs would be filtered out:
    { name: "foo" }
    { name: "foo", files: ["*.ts"] }
    { name: "foo", files: ["*.ts"], ignores: ["*.test.ts"] }

    For example, if we have a config that looks like this:
    { name: "foo", extends: [plugin1], ignores: ["foo.ts"] }

    Two configs are created:
    { name: "foo", extends: [plugin1], ignores: ["foo.ts"] }
    { name: "foo", ignores: ["foo.ts"] }

    In a case like this, the second config becomes a global ignore which is not what we want.
     */
    return configKeys.some((key) => !["name", "files", "ignores"].includes(key))
  })

  return filteredConfigs
}

/**
 * We need to ignore all JSON, YAML, and TOML files for some configs or else they will throw errors.
 */
const jsonYamlTomlIgnores = [
  ...new Set(
    jsonYamlTomlPreset
      .flat()
      .map((config) => config.files)
      .flat(Infinity)
      .filter((pattern) => typeof pattern === "string"),
  ),
]

export type { ConfigRules, StrictConfig, RuleEntry, FlatConfig, SeverityString }
export { buildConfig, jsonYamlTomlIgnores }
