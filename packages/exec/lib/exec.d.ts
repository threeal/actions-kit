import { Result } from "./result";
/**
 * Runs a command
 * @param command command to run
 * @param args additional arguments for the command
 * @returns a command run result
 */
export declare function run(command: string, ...args: string[]): Promise<Result>;
/**
 * Runs a command silently
 * @param command command to run
 * @param args additional arguments for the command
 * @returns a command run result
 */
export declare function runSilently(command: string, ...args: string[]): Promise<Result>;
/**
 * Executes a command and gets the output
 * @param command command to execute
 * @param args additional arguments for the command
 * @returns a command execution result
 */
export declare function execOut(command: string, ...args: string[]): Promise<Result>;
/**
 * Executes a command silently and gets the output
 * @param command command to execute
 * @param args additional arguments for the command
 * @returns a command execution result
 */
export declare function execOutSilently(command: string, ...args: string[]): Promise<Result>;
