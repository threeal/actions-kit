# Actions Kit - Dev

[![npm version](https://img.shields.io/npm/v/@actions-kit/dev)](https://www.npmjs.com/package/@actions-kit/dev)
[![build status](https://img.shields.io/github/actions/workflow/status/threeal/actions-kit/build.yml?branch=dev@latest)](https://github.com/threeal/actions-kit/actions/workflows/build.yml?query=branch%3Adev%40latest)

A development tool library for [Actions Kit](https://github.com/threeal/actions-kit), an additional [toolkit](https://github.com/actions/toolkit) for developing [GitHub Actions](https://github.com/features/actions).

This package simplifies the development configuration of other packages in the Actions Kit and can also be used in other projects.
It uses the following stacks for project development:

- [TypeScript](https://www.typescriptlang.org/): The primary language for project development.
- [Prettier](https://prettier.io/): A code formatter for TypeScript, JavaScript, and JSON source files.
- [ESLint](https://eslint.org/): A linter for TypeScript and JavaScript code.
- [Jest](https://jestjs.io/): A testing framework for TypeScript and JavaScript code.

This package offers two main features:
- A dev tool that serves as the primary entry point for executing various commands.
- A default configuration along with the flexibility to modify it according to the specific requirements of a project.

## Installation

Run the following commmand to install the `@actions-kit/dev` package as a dev dependency:

```sh
npm install @actions-kit/dev --save-dev
```

## Usage

### Using the Dev Tool

Use the dev tool by running the following commands:

- `dev build`: Compiles source files from TypeScript to JavaScript.
- `dev clean`: Cleans the build output directory.
- `dev format`: Formats the source files using Prettier.
- `dev lint`: Lints the source files using ESLint.
- `dev test`: Runs tests using Jest.

The dev tool can also be invoked as a script in the `package.json` file to simplify build commands during project development:

```json
{
  ...
  "scripts": {
    "build": "dev build",
    "clean": "dev clean",
    "format": "dev format",
    "lint": "dev lint",
    "test": "dev test"
  },
  ...
}
```

### Configuring TypeScript

Configure TypeScript by extending the `tsconfig.json` from `@actions-kit/dev/tsconfig.json`:

```json
{
  "extends": "@actions-kit/dev/tsconfig.json",
  "compilerOptions": {
    "outDir": "lib"
  },
  "include": ["src"],
  ...
}
```

Make sure to set the `compilerOptions.outDir` and `include` properties correctly according to the project's requirements.
For more information on further modifications to the `tsconfig.json` file, refer to the [TSConfig reference](https://www.typescriptlang.org/tsconfig).

### Configuring ESLint

Set up a default ESLint configuration by importing `createEslintConfig` from `@actions-kit/dev` in the `.eslintrc.js` file:

```js
const dev = require("@actions-kit/dev");

module.exports = dev.createEslintConfig();
```

To modify the default configuration, pass an object to the `createEslintConfig` function:

```js
module.exports = dev.createEslintConfig({ env: { browser: true } });
```

Alternatively, pass a function to the `createEslintConfig` to further modify the default configuration:

```js
module.exports = dev.createEslintConfig((config) => {
  config.rules["no-shadow"] = 2;
  return config;
});
```

For more information on configuring ESLint, refer to the [ESLint configuration documentation](https://eslint.org/docs/latest/use/configure/).

### Configuring Jest

Set up a default Jest configuration by importing `createJestConfig` from `@actions-kit/dev` in the `jest.config.ts` file:

```ts
import { createJestConfig } from "@actions-kit/dev";

export default createJestConfig();
```

To modify the default configuration, pass an object to the `createJestConfig` function:

```ts
export default createJestConfig({ verbose: false });
```

Alternatively, pass a function to the `createJestConfig` to further modify the default configuration:

```ts
export default createJestConfig((config) => {
  config.testMatch?.push("**/*.test.js");
  return config;
});
```

For more information on configuring Jest, refer to the [Jest configuration documentation](https://jestjs.io/docs/configuration).

## License

This project is licensed under the terms of the [MIT License](./LICENSE).

Copyright © 2023 [Alfi Maulana](https://github.com/threeal)
