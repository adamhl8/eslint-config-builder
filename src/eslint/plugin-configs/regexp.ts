import regexp from "eslint-plugin-regexp"

import { buildConfig } from "../utils.js"

const regexpConfig = buildConfig({
  name: "regexp",
  extends: [regexp.configs["flat/recommended"]],
  rules: {
    // additional rules
    "regexp/no-control-character": "error",
    "regexp/no-super-linear-move": "error",
    "regexp/no-octal": "error",
    "regexp/prefer-escape-replacement-dollar-char": "error",
    "regexp/prefer-quantifier": "error",
    "regexp/require-unicode-regexp": "error",
    "regexp/require-unicode-sets-regexp": "error",
    "regexp/sort-alternatives": "error",
    "regexp/grapheme-string-literal": "error",
    "regexp/prefer-named-backreference": "error",
    "regexp/prefer-named-capture-group": "error",
    "regexp/prefer-named-replacement": "error",
    "regexp/prefer-result-array-groups": "error",
    "regexp/sort-character-class-elements": "error",

    "prefer-regex-literals": ["error", { disallowRedundantWrapping: true }], // this eslint-js rule is set in regexp's recommended config, turning it on here with additional options
  },
})

export { regexpConfig }
