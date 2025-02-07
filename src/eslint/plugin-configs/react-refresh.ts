import reactRefresh from "eslint-plugin-react-refresh"
import globals from "globals"

import { buildConfig } from "../utils.js"

const reactRefreshConfig = buildConfig({
  name: "react-refresh",
  extends: [reactRefresh.configs.recommended],
  languageOptions: {
    globals: globals.browser,
  },
  settings: {
    react: {
      version: "detect",
    },
  },
})

export { reactRefreshConfig }
