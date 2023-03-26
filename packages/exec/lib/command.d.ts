import { Result } from "./result";
/** A helper for executing a command */
export declare class Command {
    /** Command to execute */
    command: string;
    /** Additional arguments for the command */
    args: string[];
    /**
     * Constructs a new helper for executing a command
     * @param command command to execute
     * @param args additional arguments for the command
     */
    constructor(command: string, ...args: string[]);
    /**
     * Executes the command
     * @param args additional arguments for the command
     * @returns a command execution result
     */
    exec(...args: string[]): Promise<Result>;
    /**
     * Executes the command silently
     * @param args additional arguments for the command
     * @returns a command execution result
     */
    execSilently(...args: string[]): Promise<Result>;
    /**
     * Executes the command and gets the output
     * @param args additional arguments for the command
     * @returns a command execution result
     */
    execOut(...args: string[]): Promise<Result>;
    /**
     * Executes the command silently and gets the output
     * @param args additional arguments for the command
     * @returns a command execution result
     */
    execOutSilently(...args: string[]): Promise<Result>;
}
