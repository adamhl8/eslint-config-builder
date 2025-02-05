import type { Config } from "../utils.js"

import jsdoc from "eslint-plugin-jsdoc"

const jsdocConfig: Config = {
  extends: [jsdoc.configs["flat/recommended-typescript-error"]],
  rules: {
    // modifications to rules that are already turned on in the extended configs
    "jsdoc/require-jsdoc": [
      "error",
      {
        publicOnly: true,
        // https://github.com/gajus/eslint-plugin-jsdoc/issues/1189#issuecomment-1893647410
        contexts: [
          "TSDeclareFunction:not(TSDeclareFunction + TSDeclareFunction)",
          "FunctionDeclaration:not(TSDeclareFunction + FunctionDeclaration)",
        ],
        require: {
          FunctionDeclaration: false,
        },
      },
    ],

    // additional rules
    "jsdoc/check-indentation": "error",
    "jsdoc/check-line-alignment": "error",
    "jsdoc/no-bad-blocks": "error",
    "jsdoc/no-blank-block-descriptions": "error",
    "jsdoc/no-blank-blocks": "error",
    "jsdoc/require-asterisk-prefix": "error",
    "jsdoc/require-throws": "error",
  },
}

export { jsdocConfig }
