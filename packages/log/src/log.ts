import * as core from "@actions/core";

export { info } from "@actions/core";

export function warning(message: string) {
  core.info(`\u001b[33mWarning:\u001b[39m ${message}`);
}

export function error(message: string) {
  core.info(`\u001b[31mError:\u001b[39m ${message}`);
}
