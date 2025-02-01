/** @type {import("prettier").Config} */
const prettierConfig = {
  printWidth: 120,
  semi: false,
  plugins: [
    "prettier-plugin-sh",
    "prettier-plugin-pkg",
    "prettier-plugin-toml",
    "prettier-plugin-organize-imports",
    "prettier-plugin-astro",
    "prettier-plugin-tailwindcss",
    // needs to be last: https://github.com/neoki07/prettier-plugin-astro-organize-imports?tab=readme-ov-file#compatibility-with-other-prettier-plugins
    "prettier-plugin-astro-organize-imports",
  ],
  organizeImportsSkipDestructiveCodeActions: true,
  astroOrganizeImportsMode: "SortAndCombine",
  tailwindStylesheet: "./src/global.css",
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
