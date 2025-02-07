import { cypressConfig } from "../plugin-configs/cypress.js"
import { jestDomConfig } from "../plugin-configs/jest-dom.js"
import { testingLibraryConfig } from "../plugin-configs/testing-library.js"
import { vitestConfig } from "../plugin-configs/vitest.js"
import { buildConfig } from "../utils.js"

const cypress = buildConfig({
  name: "cypress-preset",
  extends: [cypressConfig],
  files: ["cypress/**/*"],
})

const testing = buildConfig({
  name: "base-testing-preset",
  extends: [vitestConfig, testingLibraryConfig, jestDomConfig],
  files: ["**/?(*.)+(spec|test).[jt]s?(x)"],
})

const testingPreset = buildConfig({
  name: "testing-preset",
  extends: [cypress, testing],
})

export { testingPreset }
