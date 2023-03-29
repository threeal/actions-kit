import { OutputResult, RunResult } from "./result";
/**
 * Runs a command
 * @param command a command to run
 * @param args additional arguments for the command
 * @returns a command run result
 */
export declare function run(command: string, ...args: string[]): Promise<RunResult>;
/**
 * Runs a command silently
 * @param command a command to run
 * @param args additional arguments for the command
 * @returns a command run result
 */
export declare function runSilently(command: string, ...args: string[]): Promise<RunResult>;
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
