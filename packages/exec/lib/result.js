"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OutputResult = exports.RunResult = void 0;
/** A command run result */
class RunResult {
    /**
     * Constructs a new command run result
     * @param code the status code
     */
    constructor(code) {
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
/** A command run and output get result */
class OutputResult extends RunResult {
    /**
     * Constructs a new command run and output get result
     * @param code the status code
     * @param output the log output
     */
    constructor(code, output) {
        super(code);
        this.output = output;
    }
}
exports.OutputResult = OutputResult;
//# sourceMappingURL=result.js.map