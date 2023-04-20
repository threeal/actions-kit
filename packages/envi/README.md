# Actions Kit - Envi

[![npm version](https://img.shields.io/npm/v/@actions-kit/envi)](https://www.npmjs.com/package/@actions-kit/envi)
[![build status](https://img.shields.io/github/actions/workflow/status/threeal/actions-kit/build.yml?branch=envi@latest)](https://github.com/threeal/actions-kit/actions/workflows/build.yml?query=branch%3Aenvi%40latest)

An environment management library of [Actions Kit](https://github.com/threeal/actions-kit), an additional [toolkit](https://github.com/actions/toolkit) for developing [GitHub Actions](https://github.com/features/actions).

## Installation

```sh
npm install @actions-kit/envi
```

## Usage

### Get Action Inputs

Use `getStringInput(key)` to get a string from an action input.

```js
const envi = require('@actions-kit/envi');

const stringInput = envi.getStringInput("string-input");
```

Or use `getMultilineInput(key)`, `getBooleanInput(key)` or `getNumberInput(key)` to respectively get a multiline string, boolean or number from an action input.

```js
const multilineInput = envi.getMultilineInput("multiline-input");
const booleanInput = envi.getBooleanInput("boolean-input");
const numberInput = envi.getNumberInput("number-input");
```

## License

This project is licensed under the terms of the [MIT License](./LICENSE).

Copyright © 2023 [Alfi Maulana](https://github.com/threeal)
