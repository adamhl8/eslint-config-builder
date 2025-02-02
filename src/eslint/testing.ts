import vitest from "@vitest/eslint-plugin"
import testingLibrary from "eslint-plugin-testing-library"
import tseslint from "typescript-eslint"

const testing = tseslint.config({
  extends: [vitest.configs.all, testingLibrary.configs["flat/react"]],
  files: ["**/?(*.)+(spec|test).[jt]s?(x)"],
})

export { testing }
