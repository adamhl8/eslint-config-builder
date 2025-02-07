import { astroConfig } from "../plugin-configs/astro.js"
import { buildConfig, jsonYamlTomlIgnores } from "../utils.js"

const astroPreset = buildConfig({
  name: "astro-preset",
  extends: [astroConfig],
  ignores: jsonYamlTomlIgnores,
})

export { astroPreset }
