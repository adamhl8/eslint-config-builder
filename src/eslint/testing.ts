import type { ConfigWithExtends as TSESLintConfig } from "typescript-eslint"

import vitest from "@vitest/eslint-plugin"
// @ts-expect-error does not include types
import cypress from "eslint-plugin-cypress/flat"
import jestDom from "eslint-plugin-jest-dom"
import testingLibrary from "eslint-plugin-testing-library"
import tseslint from "typescript-eslint"

const vitestConfig = tseslint.config({
  extends: [vitest.configs.recommended],
  settings: {
    vitest: {
      typecheck: "true",
    },
  },
  rules: {
    "vitest/consistent-test-it": "error",
    "vitest/no-alias-methods": "error",
    "vitest/no-standalone-expect": "error",
    "vitest/no-test-return-statement": "error",
    "vitest/padding-around-all": "error",
    "vitest/prefer-comparison-matcher": "error",
    "vitest/prefer-each": "error",
    "vitest/prefer-equality-matcher": "error",
    "vitest/prefer-hooks-in-order": "error",
    "vitest/prefer-hooks-on-top": "error",
    "vitest/prefer-mock-promise-shorthand": "error",
    "vitest/prefer-spy-on": "error",
    "vitest/prefer-strict-equal": "error",
    "vitest/prefer-to-be": "error",
    "vitest/prefer-to-object": "error",
    "vitest/prefer-to-contain": "error",
    "vitest/prefer-to-have-length": "error",
    "vitest/prefer-todo": "error",
    "vitest/prefer-vi-mocked": "error",
    "vitest/require-hook": "error",
    "vitest/require-to-throw-message": "error",
    "vitest/require-top-level-describe": "error",
    "vitest/valid-expect-in-promise": "error",
  },
})

const testingLibraryConfig = tseslint.config({
  extends: [testingLibrary.configs["flat/react"]],
  rules: {
    "testing-library/prefer-implicit-assert": "error",
    "testing-library/prefer-user-event": "error",
  },
})

const jestDomConfig = tseslint.config(jestDom.configs["flat/recommended"])

const cypressConfig = tseslint.config({
  // eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion, @typescript-eslint/no-unsafe-member-access
  extends: [cypress.configs.recommended as TSESLintConfig],
  files: ["cypress/**/*"],
  rules: {
    "cypress/assertion-before-screenshot": "error",
    "cypress/no-async-before": "error",
    "cypress/no-force": "error",
  },
})

const testingConfig = tseslint.config(
  {
    extends: [vitestConfig, testingLibraryConfig, jestDomConfig],
    files: ["**/?(*.)+(spec|test).[jt]s?(x)"],
  },
  cypressConfig,
)

export { testingConfig }
