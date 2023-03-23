import * as core from "@actions/core";

export { info } from "@actions/core";

/**
 * Writes warning to log with console.log.
 * @param message warning message
 */
export function warning(message: string) {
  core.warning(message);
}

/**
 * Writes error to log with console.log.
 * @param message error message
 */
export function error(message: string) {
  core.error(message);
}

/**
 * Writes error to log with console.log and sets the action status to failed.
 * @param message error message
 */
export function fatal(message: string) {
  core.setFailed(message);
}
