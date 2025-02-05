import type { Config } from "../utils.js"

import react from "eslint-plugin-react"
import globals from "globals"

const reactConfig: Config = {
  // @ts-expect-error not undefined
  extends: [react.configs.flat.recommended, react.configs.flat["jsx-runtime"]],
  ignores: ["**/*.astro"],
  languageOptions: {
    globals: globals.browser,
  },
  settings: {
    react: {
      version: "detect",
    },
  },
  rules: {
    // additional rules
    "react/button-has-type": "error",
    "react/checked-requires-onchange-or-readonly": "error",
    "react/destructuring-assignment": "error",
    "react/forward-ref-uses-ref": "error",
    "react/function-component-definition": "error",
    "react/hook-use-state": "error",
    "react/iframe-missing-sandbox": "error",
    "react/jsx-boolean-value": ["error", "always"],
    "react/jsx-curly-brace-presence": ["error", { props: "never", children: "never", propElementValues: "always" }],
    "react/jsx-fragments": "error",
    "react/jsx-no-bind": "error",
    "react/jsx-no-constructed-context-values": "error",
    "react/jsx-no-leaked-render": "error",
    "react/jsx-no-script-url": "error",
    "react/jsx-no-useless-fragment": ["error", { allowExpressions: true }],
    "react/jsx-pascal-case": "error",
    "react/jsx-props-no-spread-multi": "error",
    "react/no-access-state-in-setstate": "error",
    "react/no-array-index-key": "error",
    "react/no-arrow-function-lifecycle": "error",
    "react/no-danger": "error",
    "react/no-did-mount-set-state": "error",
    "react/no-did-update-set-state": "error",
    "react/no-invalid-html-attribute": "error",
    "react/no-namespace": "error",
    "react/no-object-type-as-default-prop": "error",
    "react/no-redundant-should-component-update": "error",
    "react/no-this-in-sfc": "error",
    "react/no-typos": "error",
    "react/no-unstable-nested-components": "error",
    "react/no-unused-class-component-methods": "error",
    "react/no-unused-state": "error",
    "react/no-will-update-set-state": "error",
    "react/prefer-es6-class": "error",
    "react/prefer-exact-props": "error",
    "react/prefer-read-only-props": "error",
    "react/prefer-stateless-function": "error",
    "react/require-optimization": "error",
    "react/self-closing-comp": "error",
    "react/void-dom-elements-no-children": "error",
  },
}

export { reactConfig }
