import reactCompiler from "eslint-plugin-react-compiler"
import globals from "globals"

import { buildConfig } from "../utils.js"

const reactCompilerConfig = buildConfig({
  name: "react-compiler",
  // @ts-expect-error plugin rule is typed as a string instead of a RuleEntry
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
