import { astro } from "./eslint/astro.js"
import { base } from "./eslint/base.js"
import { react } from "./eslint/react.js"
import { testing } from "./eslint/testing.js"

const eslintConfigs = {
  astro,
  base,
  react,
  testing,
}

export { eslintConfigs }
export { prettierConfig } from "./prettier.config.js"
