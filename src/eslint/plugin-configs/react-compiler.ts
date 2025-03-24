import reactCompiler from "eslint-plugin-react-compiler"
import globals from "globals"

import { buildConfig } from "../utils.js"

const reactCompilerConfig = buildConfig({
  name: "react-compiler",
  extends: [reactCompiler.configs.recommended],
  languageOptions: {
    globals: globals.browser,
  },
  settings: {
    react: {
      version: "detect",
    },
  },
})

export { reactCompilerConfig }
