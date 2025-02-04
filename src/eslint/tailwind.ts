import tailwind from "eslint-plugin-tailwindcss"
import tseslint from "typescript-eslint"

const tailwindConfig = tseslint.config(tailwind.configs["flat/recommended"])

export { tailwindConfig }
