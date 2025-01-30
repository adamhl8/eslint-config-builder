/** @type {import("prettier").Config} */
const prettierConfig = {
  printWidth: 120,
  semi: false,
  plugins: [
    "@trivago/prettier-plugin-sort-imports",
    "prettier-plugin-sh",
    "prettier-plugin-pkg",
    "prettier-plugin-toml",
    "prettier-plugin-tailwindcss",
    "prettier-plugin-astro",
  ],
  importOrder: ["^@/(.*)$", "^[./]"],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
  overrides: [
    {
      // https://github.com/prettier/prettier/issues/15956
      files: "*.jsonc",
      options: {
        trailingComma: "none",
      },
    },
    {
      files: "*.astro",
      options: {
        parser: "astro",
      },
    },
  ],
}

export { prettierConfig }
export default prettierConfig
