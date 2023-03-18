# Actions Kit - Exec

A command execution library of [Actions Kit](https://github.com/threeal/actions-kit), a toolkit for developing [GitHub Actions](https://github.com/features/actions).

## Installation

```sh
npm install @actions-kit/exec
```

## Usage

### Execute a Command

Use `exec(command, args...)` to execute a command.

```js
const exec = require('@actions-kit/exec');

await exec.exec("node", "--version");
```

It will returns a `Result` object, which contains an exit code of the execution.
```js
const res = await exec.exec("node", "--version");
if (!res.isOk()) {
  console.log(`Failed with exit code: ${res.code}`);
}
```

With `execOut(command, args...)`, you can get log output of the execution.
```js
const res = await exec.execOut("node", "--version");
console.log(`Output: ${res.output}`);
```

## License

This project is licensed under the terms of the [MIT License](./LICENSE).

Copyright © 2023 [Alfi Maulana](https://github.com/threeal)
