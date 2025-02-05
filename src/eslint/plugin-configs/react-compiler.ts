import type { BaseConfig, Config } from "../utils.js"

// @ts-expect-error https://github.com/facebook/react/issues/30119
import reactCompiler from "eslint-plugin-react-compiler"
import globals from "globals"

const reactCompilerConfig: Config = {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion, @typescript-eslint/no-unsafe-member-access
  extends: [reactCompiler.configs.recommended as BaseConfig],
  ignores: ["**/*.astro"],
  languageOptions: {
    globals: globals.browser,
  },
  settings: {
    react: {
      version: "detect",
    },
  },
  rules: {},
}

export { reactCompilerConfig }
