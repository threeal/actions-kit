# Actions Kit - Exec

[![build status](https://img.shields.io/github/actions/workflow/status/threeal/actions-kit/build.yml?branch=exec@latest)](https://github.com/threeal/actions-kit/actions/workflows/build.yml?query=branch%3Aexec%40latest)

A command execution library of [Actions Kit](https://github.com/threeal/actions-kit), a toolkit for developing [GitHub Actions](https://github.com/features/actions).

## Installation

```sh
npm install @actions-kit/exec
```

## Usage

### Run a Command

Use `run(command, args...)` to run a command.

```js
const exec = require('@actions-kit/exec');

await exec.run("node", "--version");
```

It will returns a `Result` object, which contains an exit code of the command run.
```js
const res = await exec.run("node", "--version");
if (!res.isOk()) {
  console.log(`Failed with exit code: ${res.code}`);
}
```

### Run a Command and Get the Output

Use `output(command, args...)`, to run a command and get the output.
```js
const exec = require('@actions-kit/exec');

const res = await exec.output("node", "--version");
console.log(`Node version: ${res.output}`);
```

### Construct a Command Helper

Construct a command helper to simplify the command run.
```js
const exec = require('@actions-kit/exec');

const node = new exec.Command("node", "-e");
await node.run("process.exit();");
```

## License

This project is licensed under the terms of the [MIT License](./LICENSE).

Copyright © 2023 [Alfi Maulana](https://github.com/threeal)
