import type { Config } from "../utils.js"

import vitest from "@vitest/eslint-plugin"

const vitestConfig: Config = {
  extends: [vitest.configs.recommended],
  files: ["**/?(*.)+(spec|test).[jt]s?(x)"],
  settings: {
    vitest: {
      typecheck: "true",
    },
  },
  rules: {
    // additional rules
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
    "vitest/prefer-to-be-object": "error",
    "vitest/prefer-to-contain": "error",
    "vitest/prefer-to-have-length": "error",
    "vitest/prefer-todo": "error",
    "vitest/prefer-vi-mocked": "error",
    "vitest/require-to-throw-message": "error",
    "vitest/require-top-level-describe": "error",
    "vitest/valid-expect-in-promise": "error",
  },
}

export { vitestConfig }
