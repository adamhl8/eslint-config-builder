import type { Config } from "../utils.js"

import tailwind from "eslint-plugin-tailwindcss"

const tailwindConfig: Config = {
  extends: [tailwind.configs["flat/recommended"]],
  rules: {},
}
export { tailwindConfig }
