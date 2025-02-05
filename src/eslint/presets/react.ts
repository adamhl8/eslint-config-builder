import tseslint from "typescript-eslint"

import { jsxA11yConfig } from "../plugin-configs/jsx-a11y.js"
import { reactCompilerConfig } from "../plugin-configs/react-compiler.js"
import { reactHooksConfig } from "../plugin-configs/react-hooks.js"
import { reactRefreshConfig } from "../plugin-configs/react-refresh.js"
import { reactConfig } from "../plugin-configs/react.js"

const reactPreset = tseslint.config(
  reactConfig,
  reactHooksConfig,
  reactRefreshConfig,
  reactCompilerConfig,
  jsxA11yConfig,
)

export { reactPreset }
