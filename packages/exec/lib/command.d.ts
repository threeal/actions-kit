import { Result } from "./result";
/** A helper for running a command */
export declare class Command {
    /** The command to run */
    command: string;
    /** Additional arguments for the command */
    args: string[];
    /**
     * Constructs a new helper for running a command
     * @param command a command to run
     * @param args additional arguments for the command
     */
    constructor(command: string, ...args: string[]);
    /**
     * Runs the command
     * @param args additional arguments for the command
     * @returns a command run result
     */
    run(...args: string[]): Promise<Result>;
    /**
     * Runs the command silently
     * @param args additional arguments for the command
     * @returns a command run result
     */
    runSilently(...args: string[]): Promise<Result>;
    /**
     * Runs the command and gets the output
     * @param args additional arguments for the command
     * @returns a command run result
     */
    output(...args: string[]): Promise<Result>;
    /**
     * Runs the command silently and gets the output
     * @param args additional arguments for the command
     * @returns a command run result
     */
    outputSilently(...args: string[]): Promise<Result>;
}
