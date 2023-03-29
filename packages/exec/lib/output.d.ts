import { OutputResult } from "./result";
/**
 * Runs a command and gets the output
 * @param command a command to run
 * @param args additional arguments for the command
 * @returns a command run result
 */
export declare function output(command: string, ...args: string[]): Promise<OutputResult>;
/**
 * Runs a command silently and gets the output
 * @param command a command to run
 * @param args additional arguments for the command
 * @returns a command run result
 */
export declare function outputSilently(command: string, ...args: string[]): Promise<OutputResult>;
