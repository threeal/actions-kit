import * as core from "@actions/core";

export { info } from "@actions/core";

/**
 * Writes warning to log with console.log.
 * @param message warning message
 */
export function warning(message: string) {
  core.info(`\u001b[33mWarning:\u001b[39m ${message}`);
}

/**
 * Writes error to log with console.log.
 * @param message error message
 */
export function error(message: string) {
  core.info(`\u001b[31mError:\u001b[39m ${message}`);
}
