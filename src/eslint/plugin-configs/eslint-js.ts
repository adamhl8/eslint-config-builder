import eslintJs from "@eslint/js"

import { buildConfig } from "../utils.js"

const eslintJsConfig = buildConfig({
  name: "eslint-js",
  extends: [eslintJs.configs.recommended],
  rules: {
    // additional rules
    "array-callback-return": "error",
    "no-await-in-loop": "error",
    "no-constructor-return": "error",
    "no-promise-executor-return": "error",
    "no-self-compare": "error",
    "no-template-curly-in-string": "error",
    "no-unmodified-loop-condition": "error",
    "no-unreachable-loop": "error",
    "no-useless-assignment": "error",
    "require-atomic-updates": "error",
    "consistent-this": "error",
    "default-case": "error",
    "default-case-last": "error",
    "func-name-matching": "error",
    eqeqeq: "error",
    "grouped-accessor-pairs": ["error", "getBeforeSet"],
    "guard-for-in": "error",
    "logical-assignment-operators": ["error", "always", { enforceForIfStatements: true }],
    "no-div-regex": "error",
    "no-else-return": "error",
    "no-eval": "error",
    "no-extend-native": "error",
    "no-extra-bind": "error",
    "no-extra-label": "error",
    "no-implicit-coercion": "error",
    "no-implicit-globals": "error",
    "no-iterator": "error",
    "no-lone-blocks": "error",
    "no-lonely-if": "error",
    "no-multi-assign": "error",
    "no-new": "error",
    "no-new-func": "error",
    "no-new-wrappers": "error",
    "no-object-constructor": "error",
    "no-proto": "error",
    "no-return-assign": "error",
    "no-script-url": "error",
    "no-sequences": "error",
    "no-throw-literal": "error",
    "no-unneeded-ternary": "error",
    "no-useless-call": "error",
    "no-useless-computed-key": "error",
    "no-useless-concat": "error",
    "no-useless-rename": "error",
    "no-useless-return": "error",
    "prefer-arrow-callback": "error",
    "prefer-numeric-literals": "error",
    "prefer-object-has-own": "error",
    "prefer-object-spread": "error",
    "prefer-template": "error",
    radix: ["error", "as-needed"],
    "symbol-description": "error",
    yoda: "error",

    // covered by regexp
    "no-useless-escape": "off",
    "no-useless-backreference": "off",
    "no-regex-spaces": "off",
    "no-misleading-character-class": "off",
    "no-invalid-regexp": "off",
    "no-empty-character-class": "off",
    "no-control-regex": "off",

    // covered by sonarjs
    "no-useless-catch": "off",
    "no-unused-vars": "off",
    "no-fallthrough": "off",
    "no-delete-var": "off",
  },
})

export { eslintJsConfig }
