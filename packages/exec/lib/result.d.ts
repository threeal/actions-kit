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
