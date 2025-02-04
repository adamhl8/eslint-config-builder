import type { ConfigWithExtends as TSESLintConfig } from "typescript-eslint"

import eslintJs from "@eslint/js"
import prettier from "eslint-config-prettier"
import jsdoc from "eslint-plugin-jsdoc"
// @ts-expect-error does not include types
import promise from "eslint-plugin-promise"
import regexp from "eslint-plugin-regexp"
import sonarjs from "eslint-plugin-sonarjs"
import unicorn from "eslint-plugin-unicorn"
import globals from "globals"
import tseslint from "typescript-eslint"

import { jsonYamlTomlIgnores } from "./json-yaml-toml.js"

const eslintJsConfig = tseslint.config({
  extends: [eslintJs.configs.recommended],
  rules: {
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
    "require-unicode-regexp": ["error", { requireFlag: "v" }],
    "class-methods-use-this": "error",
    complexity: "error",
    "consistent-this": "error",
    "default-case": "error",
    "default-case-last": "error",
    "func-name-matching": "error",
    eqeqeq: "error",
    "grouped-accessor-pairs": ["error", "getBeforeSet"],
    "guard-for-in": "error",
    "logical-assignment-operators": ["error", "always", { enforceForIfStatements: true }],
    "no-array-constructor": "error",
    "no-div-regex": "error",
    "no-else-return": "error",
    "no-eval": "error",
    "no-extend-native": "error",
    "no-extra-bind": "error",
    "no-extra-label": "error",
    "no-implicit-coercion": "error",
    "no-implicit-globals": "error",
    "no-implied-eval": "error",
    "no-iterator": "error",
    "no-lone-blocks": "error",
    "no-lonely-if": "error",
    "no-loop-func": "error",
    "no-multi-assign": "error",
    "no-negated-condition": "error",
    "no-new": "error",
    "no-new-func": "error",
    "no-new-wrappers": "error",
    "no-object-constructor": "error",
    "no-proto": "error",
    "no-return-assign": "error",
    "no-script-url": "error",
    "no-sequences": "error",
    "no-shadow": "error",
    "no-throw-literal": "error",
    "no-unneeded-ternary": "error",
    "no-unused-expressions": "error",
    "no-useless-call": "error",
    "no-useless-computed-key": "error",
    "no-useless-concat": "error",
    "no-useless-constructor": "error",
    "no-useless-rename": "error",
    "no-useless-return": "error",
    "no-var": "error",
    "prefer-arrow-callback": "error",
    "prefer-const": "error",
    "prefer-named-capture-group": "error",
    "prefer-numeric-literals": "error",
    "prefer-object-has-own": "error",
    "prefer-object-spread": "error",
    "prefer-promise-reject-errors": "error",
    "prefer-regex-literals": ["error", { disallowRedundantWrapping: true }],
    "prefer-rest-params": "error",
    "prefer-spread": "error",
    "prefer-template": "error",
    radix: ["error", "as-needed"],
    "require-await": "error",
    "symbol-description": "error",
    yoda: "error",
  },
})

const tseslintConfig = tseslint.config({
  extends: [tseslint.configs.strictTypeChecked, tseslint.configs.stylisticTypeChecked],
  rules: {
    "@typescript-eslint/no-confusing-void-expression": [
      "error",
      {
        ignoreArrowShorthand: true,
      },
    ],
    "@typescript-eslint/consistent-type-imports": "error",
    "@typescript-eslint/consistent-type-exports": "error",
    "@typescript-eslint/no-import-type-side-effects": "error",
    "@typescript-eslint/explicit-member-accessibility": "error",
    "@typescript-eslint/method-signature-style": "error",
    "@typescript-eslint/no-unnecessary-qualifier": "error",
    "@typescript-eslint/no-unsafe-type-assertion": "error",
    "@typescript-eslint/no-useless-empty-export": "error",
    "@typescript-eslint/parameter-properties": "error",
    "@typescript-eslint/prefer-enum-initializers": "error",
    "@typescript-eslint/prefer-readonly": "error",
    "@typescript-eslint/promise-function-async": "error",
    "@typescript-eslint/require-array-sort-compare": "error",
    "@typescript-eslint/switch-exhaustiveness-check": "error",

    // the following rules have @eslint/js equivalents that need to be turned off

    "no-loop-func": "off",
    "@typescript-eslint/no-loop-func": "error",

    "class-methods-use-this": "off",
    "@typescript-eslint/class-methods-use-this": "error",

    "no-shadow": "off",
    "@typescript-eslint/no-shadow": "error",
  },
})

const unicornConfig = tseslint.config({
  extends: [unicorn.configs["flat/recommended"]],
  rules: {
    "unicorn/better-regex": "error",
    "unicorn/consistent-destructuring": "error",
    "unicorn/custom-error-definition": "error",
    "unicorn/no-unused-properties": "error",
    "unicorn/prefer-json-parse-buffer": "error",
    "unicorn/require-post-message-target-origin": "error",
    "unicorn/string-content": "error",

    "unicorn/filename-case": "off",
    "unicorn/prevent-abbreviations": "off",
  },
})

// eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion
const sonarjsConfig = sonarjs.configs.recommended as TSESLintConfig

const promiseConfig = tseslint.config({
  // eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion, @typescript-eslint/no-unsafe-member-access
  extends: [promise.configs["flat/recommended"] as TSESLintConfig],
  rules: {
    "promise/avoid-new": "error",
    "promise/no-multiple-resolved": "error",
    "promise/prefer-await-to-callbacks": "error",
    "promise/prefer-await-to-then": "error",
    "promise/prefer-catch": "error",
  },
})

const regexpConfig = tseslint.config({
  extends: [regexp.configs["flat/recommended"]],
  rules: {
    "no-control-regex": "off",
    "regexp/no-control-character": "error",

    "regexp/no-super-linear-move": "error",
    "regexp/no-octal": "error",
    "regexp/prefer-escape-replacement-dollar-char": "error",
    "regexp/prefer-quantifier": "error",

    "require-unicode-regexp": "off",
    "regexp/require-unicode-regexp": "error",
    "regexp/require-unicode-sets-regexp": "error",

    "regexp/sort-alternatives": "error",
    "regexp/grapheme-string-literal": "error",
    "regexp/prefer-named-backreference": "error",

    "prefer-named-capture-group": "off",
    "regexp/prefer-named-capture-group": "error",

    "regexp/prefer-named-replacement": "error",
    "regexp/prefer-result-array-groups": "error",
    "regexp/sort-character-class-elements": "error",
  },
})

const jsdocConfig = tseslint.config({
  extends: [jsdoc.configs["flat/recommended-typescript-error"]],
  rules: {
    "jsdoc/check-indentation": "error",
    "jsdoc/check-line-alignment": "error",
    "jsdoc/no-bad-blocks": "error",
    "jsdoc/no-blank-block-descriptions": "error",
    "jsdoc/no-blank-blocks": "error",
    "jsdoc/require-asterisk-prefix": "error",
    "jsdoc/require-throws": "error",
  },
})

const typescriptConfig = tseslint.config(
  {
    // for reasons that aren't entirely clear, adding the @eslint/json plugin causes the @eslint/js plugin to try to parse JSON files which makes eslint throw an error
    extends: [eslintJsConfig],
    ignores: ["**/*.json"],
  },
  { extends: [tseslintConfig], ignores: jsonYamlTomlIgnores },
  eslintJsConfig,
  unicornConfig,
  sonarjsConfig,
  promiseConfig,
  regexpConfig,
  jsdocConfig,
)

const tsLanguageOptionsConfig = tseslint.config(prettier, {
  languageOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    parserOptions: {
      projectService: true,
    },
    globals: globals.node,
  },
})

export { typescriptConfig, tsLanguageOptionsConfig }
