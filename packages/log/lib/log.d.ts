export { info } from "@actions/core";
/**
 * Writes warning to log with console.log.
 * @param message warning message
 */
export declare function warning(message: string): void;
/**
 * Writes error to log with console.log.
 * @param message error message
 */
export declare function error(message: string): void;
/**
 * Writes error to log with console.log and sets the action status to failed.
 * @param message error message
 */
export declare function fatal(message: string): void;
