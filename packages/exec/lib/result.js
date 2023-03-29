"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Result = exports.RunResult = void 0;
/** A command run result */
class RunResult {
    /**
     * Constructs a new command run result
     * @param code the optional status code
     */
    constructor(code) {
        /** The status code */
        this.code = 0;
        if (code !== undefined)
            this.code = code;
    }
    /**
     * Checks if the status is ok (status code is `0`)
     * @returns `true` if the status is ok
     */
    isOk() {
        return this.code === 0;
    }
}
exports.RunResult = RunResult;
/** A command execution result */
class Result extends RunResult {
    /**
     * Constructs a new command execution result
     * @param code the optional status code
     */
    constructor(code) {
        super(code);
        /** The log output */
        this.output = "";
        if (code !== undefined)
            this.code = code;
    }
}
exports.Result = Result;
//# sourceMappingURL=result.js.map