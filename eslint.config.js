import tseslint from "typescript-eslint"

import { ESLintConfigBuilder } from "./dist/index.js"

const eslintConfig = new ESLintConfigBuilder().astro().jsonYamlToml().react().tailwind().testing().build()

export default tseslint.config({ ignores: ["dist/**"] }, eslintConfig)
