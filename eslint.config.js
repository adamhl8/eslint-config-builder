import tseslint from "typescript-eslint"
import { ESLintConfigBuilder } from "./dist/index.js"

const eslintConfig = new ESLintConfigBuilder().astro().react().testing().build()

export default tseslint.config({ ignores: ["dist/**"] }, eslintConfig)
