# Actions Kit - Dev

[![npm version](https://img.shields.io/npm/v/@actions-kit/dev)](https://www.npmjs.com/package/@actions-kit/dev)
[![build status](https://img.shields.io/github/actions/workflow/status/threeal/actions-kit/build.yml?branch=dev@latest)](https://github.com/threeal/actions-kit/actions/workflows/build.yml?query=branch%3Adev%40latest)

A development tool library of [Actions Kit](https://github.com/threeal/actions-kit), an additional [toolkit](https://github.com/actions/toolkit) for developing [GitHub Actions](https://github.com/features/actions).

## Installation

```sh
npm install @actions-kit/dev
```

## Usage

### Using the Dev Tool

Use the dev tool by running the following commands:
- `dev build`: Compiles source files from [TypeScript](https://www.typescriptlang.org/) to JavaScript.
- `dev clean`: Cleans the build output directory.
- `dev format`: Formats the source files using [Prettier](https://prettier.io/).
- `dev lint`: Lints the source files using [ESLint](https://eslint.org/).
- `dev test`: Runs tests using [Jest](https://jestjs.io/).

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
