import type { BaseConfig, Config } from "../utils.js"

import sonarjs from "eslint-plugin-sonarjs"

const sonarjsConfig: Config = {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion
  extends: [sonarjs.configs.recommended as BaseConfig],
  rules: {
    // covered by tseslint
    "sonarjs/prefer-regexp-exec": "off",
    "sonarjs/no-array-delete": "off",
    "sonarjs/no-unused-vars": "off",

    // covered by regexp
    "sonarjs/no-empty-group": "off",
    "sonarjs/no-regex-spaces": "off",
    "sonarjs/no-misleading-character-class": "off",
    "sonarjs/no-invalid-regexp": "off",
    "sonarjs/no-empty-character-class": "off",
    "sonarjs/no-control-regex": "off",

    // covered by react
    "sonarjs/prefer-read-only-props": "off",
    "sonarjs/jsx-no-leaked-render": "off",
  },
}

export { sonarjsConfig }
