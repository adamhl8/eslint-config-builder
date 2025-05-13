import { jsxA11yConfig } from "../plugin-configs/jsx-a11y.js"
import { reactHooksConfig } from "../plugin-configs/react-hooks.js"
import { reactRefreshConfig } from "../plugin-configs/react-refresh.js"
import { reactConfig } from "../plugin-configs/react.js"
import { buildConfig, jsonYamlTomlIgnores } from "../utils.js"

const reactPreset = buildConfig({
  name: "react-preset",
  extends: [reactConfig, reactHooksConfig, reactRefreshConfig, jsxA11yConfig],
  ignores: ["**/*.astro", ...jsonYamlTomlIgnores],
})

export { reactPreset }
