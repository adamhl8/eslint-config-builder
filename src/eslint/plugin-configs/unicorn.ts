import unicorn from "eslint-plugin-unicorn"

import { buildConfig } from "../utils.js"

const unicornConfig = buildConfig({
  name: "unicorn",
  extends: [unicorn.configs.recommended],
  rules: {
    // modifications to rules that are already turned on in the extended configs
    "unicorn/filename-case": "off",
    "unicorn/prevent-abbreviations": "off",

    // additional rules
    "unicorn/better-regex": "error",
    "unicorn/consistent-destructuring": "error",
    "unicorn/custom-error-definition": "error",
    "unicorn/no-unused-properties": "error",
    "unicorn/prefer-json-parse-buffer": "error",
    "unicorn/require-post-message-target-origin": "error",
    "unicorn/string-content": "error",

    "unicorn/prefer-string-starts-ends-with": "off", // covered by tseslint
  },
})

export { unicornConfig }
