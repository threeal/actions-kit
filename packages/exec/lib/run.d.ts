/** A command run result */
export declare class RunResult {
    /** The status code */
    code: number;
    /**
     * Constructs a new command run result
     * @param code the status code
     */
    constructor(code: number);
    /**
     * Checks if the status is ok (status code is `0`)
     * @returns `true` if the status is ok
     */
    isOk(): boolean;
}
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
