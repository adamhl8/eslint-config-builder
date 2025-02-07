// @ts-expect-error https://github.com/facebook/react/issues/30119
import reactCompiler from "eslint-plugin-react-compiler"
import globals from "globals"

import { buildConfig } from "../utils.js"

const reactCompilerConfig = buildConfig({
  name: "react-compiler",
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
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
