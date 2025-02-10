# eslint-config-builder

Configs (prettier, eslint) I use across my projects.

## Usage Notes

When using the `react` preset, make sure to follow the instructions for your framework in the [React Compiler docs](https://react.dev/learn/react-compiler#installation).

### Using `.ts` files for ESLint and Prettier configs

Both ESLint and Prettier support using TypeScript files for their configs. Making this work depends on your package manager and JS runtime:

#### Bun

For projects using Bun, specify the `--bun` flag for `bun run` (read more about the `--bun` flag [here](https://bun.sh/docs/cli/run#bun)):

```bash
bun run --bun eslint .
```

Alternatively, to avoid passing the `--bun` flag every time, create a `bunfig.toml` file in the root of your project:

```toml
[run]
bun = true
```

Your `package.json` scripts might look like this:

```json
"scripts": {
  "lint": "eslint .",
  "format": "prettier --write ."
}
```

```bash
bun eslint .
```

**Note: Due to a [bug/oversight](https://github.com/oven-sh/bun/issues/11445) in how Bun reads the `bunfig.toml` file, you need to specify the `-c / --config` flag for `bun run`.**

So unfortunately this is not much better than just using `--bun`. Hopefully this is fixed soon.

```bash
bun run -c eslint .
```

Your `package.json` scripts need to do this as well: `"lint": "bun run -c eslint ."`

#### Node

Node has an experimental flag for running TypeScript files directly with the `--experimental-strip-types` flag (requires Node>=22.6.0).

However, ESLint still [requires](https://eslint.org/docs/latest/use/configure/configuration-files#typescript-configuration-files) installing [jiti](https://github.com/unjs/jiti) as a dev dependency for reading a TypeScript config file.

For example, using Yarn:

```bash
yarn add -D jiti
yarn run eslint .
```

For Prettier, you have to run Node directly (with the `--experimental-strip-types` flag) with the path to the executable in `node_modules`:

```bash
node --experimental-strip-types node_modules/.bin/prettier --write .
```

Your `package.json` scripts might look like this:

```json
"scripts": {
  "lint": "eslint .",
  "format": "node --experimental-strip-types node_modules/.bin/prettier --write ."
}
```
