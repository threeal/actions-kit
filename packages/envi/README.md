# Actions Kit - Envi

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

## License

This project is licensed under the terms of the [MIT License](./LICENSE).

Copyright © 2023 [Alfi Maulana](https://github.com/threeal)
