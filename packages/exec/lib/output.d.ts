import { RunResult } from "./run";
/** A command run and output get result */
export declare class OutputResult extends RunResult {
    /** The log output */
    output: string;
    /**
     * Constructs a new command run and output get result
     * @param code the status code
     * @param output the log output
     */
    constructor(code: number, output: string);
}
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
