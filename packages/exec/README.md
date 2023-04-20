# Actions Kit - Exec

[![npm version](https://img.shields.io/npm/v/@actions-kit/exec)](https://www.npmjs.com/package/@actions-kit/exec)
[![build status](https://img.shields.io/github/actions/workflow/status/threeal/actions-kit/build.yml?branch=exec@latest)](https://github.com/threeal/actions-kit/actions/workflows/build.yml?query=branch%3Aexec%40latest)

A command execution library of [Actions Kit](https://github.com/threeal/actions-kit), an additional [toolkit](https://github.com/actions/toolkit) for developing [GitHub Actions](https://github.com/features/actions).

## Installation

```sh
npm install @actions-kit/exec
```

## Usage

### Run a Command

Use `run(command, args...)` to run a command.

```js
const exec = require('@actions-kit/exec');

await exec.run("node", "index.js");
```

It will returns a `RunResult` object which contains an exit code of the command run.
```js
const res = await exec.run("node", "-c", "index.js");
if (!res.isOk()) {
  console.log(`Failed with exit code: ${res.code}`);
}
```

### Run a Command and Get the Output

Use `output(command, args...)` to run a command and get the output. It will returns an `OutputResult` object which contains an exit code and the log output of the command run.
```js
const exec = require('@actions-kit/exec');

const res = await exec.output("node", "--version");
if (!res.isOk()) {
  console.log(`Failed with exit code: ${res.code}`);
} else {
  console.log(`Node version: ${res.output}`);
}
```

### Run a Command Silently

Use `runSilently(command, args...)` to run a command silently without printing anything to the console.
```js
const exec = require('@actions-kit/exec');

await exec.runSilently("node", "-c", "index.js");
```

Or use `outputSilently(command, args...)` to run a command and get the output silently without printing anything to the console.
```js
const res = await exec.outputSilently("node", "--version");
console.log(`Node version: ${res.output}`);
```

### Construct a Command Helper

Construct a command helper using `Command` class to simplify the command run.
```js
const exec = require('@actions-kit/exec');

const node = new exec.Command("node", "-e");
await node.run("process.exit();");
```

All command run functions are available in the `Command` class and are behaving the same.
```js
await node.runSilently("process.exit();");

const res = node.output("console.log('Hello world!');");
console.log(`output: ${res.output}`);
```

## License

This project is licensed under the terms of the [MIT License](./LICENSE).

Copyright © 2023 [Alfi Maulana](https://github.com/threeal)
