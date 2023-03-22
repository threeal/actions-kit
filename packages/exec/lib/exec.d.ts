import { Result } from "./result";
/**
 * Executes a command
 * @param command command to execute
 * @param args additional arguments for the command
 * @returns a command execution result
 */
export declare function exec(command: string, ...args: string[]): Promise<Result>;
/**
 * Executes a command and gets the output
 * @param command command to execute
 * @param args additional arguments for the command
 * @returns a command execution result
 */
export declare function execOut(command: string, ...args: string[]): Promise<Result>;
