import tseslint from "typescript-eslint"

import { cypressConfig } from "../plugin-configs/cypress.js"
import { jestDomConfig } from "../plugin-configs/jest-dom.js"
import { testingLibraryConfig } from "../plugin-configs/testing-library.js"
import { vitestConfig } from "../plugin-configs/vitest.js"

const testingPreset = tseslint.config(vitestConfig, testingLibraryConfig, jestDomConfig, cypressConfig)

export { testingPreset }
