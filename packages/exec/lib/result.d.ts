/** A command execution result */
export declare class Result {
    /** The status code */
    code: number;
    /**
     * Constructs a new command execution result
     * @param code the optional status code
     */
    constructor(code?: number);
    /**
     * Checks if the status is ok (status code is `0`)
     * @returns `true` if the status is ok
     */
    isOk(): boolean;
}
