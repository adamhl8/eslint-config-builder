import type { TSESLint } from "@typescript-eslint/utils"
import type { ConfigWithExtends } from "typescript-eslint"

type BaseConfig = ConfigWithExtends
// make properties required
type Config = BaseConfig & Required<Pick<BaseConfig, "extends" | "rules">>
type ConfigRules = Config["rules"]

type RuleEntry = TSESLint.FlatConfig.RuleEntry | undefined

export type { ConfigRules, Config, BaseConfig, RuleEntry }
