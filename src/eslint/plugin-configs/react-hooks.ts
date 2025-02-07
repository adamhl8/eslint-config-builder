// @ts-expect-error https://github.com/facebook/react/issues/30119
import reactHooks from "eslint-plugin-react-hooks"
import globals from "globals"

import { buildConfig } from "../utils.js"

const reactHooksFlat = {
  // reactHooks hasn't been updated to use the new eslint flat config format
  // This object restructures the rules and plugin to be compatible with the new format

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
  plugins: { "react-hooks": { rules: reactHooks.rules } },
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
  rules: reactHooks.configs.recommended.rules,
}

const reactHooksConfig = buildConfig({
  name: "react-hooks",
  extends: [reactHooksFlat],
  languageOptions: {
    globals: globals.browser,
  },
  settings: {
    react: {
      version: "detect",
    },
  },
  rules: {
    // modifications to rules that are already turned on in the extended configs
    "react-hooks/exhaustive-deps": "error",
  },
})

export { reactHooksConfig }
