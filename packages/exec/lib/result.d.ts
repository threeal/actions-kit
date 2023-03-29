/** A command run result */
export declare class RunResult {
    /** The status code */
    code: number;
    /**
     * Constructs a new command run result
     * @param code the optional status code
     */
    constructor(code?: number);
    /**
     * Checks if the status is ok (status code is `0`)
     * @returns `true` if the status is ok
     */
    isOk(): boolean;
}
/** A command execution result */
export declare class Result extends RunResult {
    /** The log output */
    output: string;
    /**
     * Constructs a new command execution result
     * @param code the optional status code
     */
    constructor(code?: number);
}
