import tseslint from "typescript-eslint"
import { base } from "./eslint/base.js"
import { astro } from "./eslint/astro.js"
import { react } from "./eslint/react.js"
import { testing } from "./eslint/testing.js"

const eslintConfig = tseslint.config(astro, react, testing, base)

export default eslintConfig
