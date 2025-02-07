import tseslint from "typescript-eslint"

import { ESLintConfigBuilder } from "./dist/index.js"

const eslintConfig = new ESLintConfigBuilder().react().tailwind().astro().jsonYamlToml().testing().build()

export default tseslint.config({ ignores: ["dist/**"] }, eslintConfig, {
  rules: {
    "sonarjs/no-empty-test-file": "off",
  },
})
