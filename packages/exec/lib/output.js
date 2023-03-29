"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.outputSilently = exports.output = exports.OutputResult = void 0;
const exec = __importStar(require("@actions/exec"));
const run_1 = require("./run");
/** A command run and output get result */
class OutputResult extends run_1.RunResult {
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
async function outputHelper(silent, command, ...args) {
    const res = await exec.getExecOutput(command, args, {
        ignoreReturnCode: true,
        silent,
    });
    return new OutputResult(res.exitCode, res.stdout);
}
/**
 * Runs a command and gets the output
 * @param command a command to run
 * @param args additional arguments for the command
 * @returns a command run result
 */
async function output(command, ...args) {
    return outputHelper(false, command, ...args);
}
exports.output = output;
/**
 * Runs a command silently and gets the output
 * @param command a command to run
 * @param args additional arguments for the command
 * @returns a command run result
 */
async function outputSilently(command, ...args) {
    return outputHelper(true, command, ...args);
}
exports.outputSilently = outputSilently;
//# sourceMappingURL=output.js.map