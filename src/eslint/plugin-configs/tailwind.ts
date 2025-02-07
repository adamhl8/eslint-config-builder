import tailwind from "eslint-plugin-tailwindcss"

import { buildConfig } from "../utils.js"

const tailwindConfig = buildConfig({
  name: "tailwind",
  extends: [tailwind.configs["flat/recommended"]],
})

export { tailwindConfig }
