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
exports.runSilently = exports.run = exports.RunResult = void 0;
const exec = __importStar(require("@actions/exec"));
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
async function runHelper(silent, command, ...args) {
    const rc = await exec.exec(command, args, {
        ignoreReturnCode: true,
        silent,
    });
    return new RunResult(rc);
}
/**
 * Runs a command
 * @param command a command to run
 * @param args additional arguments for the command
 * @returns a command run result
 */
async function run(command, ...args) {
    return runHelper(false, command, ...args);
}
exports.run = run;
/**
 * Runs a command silently
 * @param command a command to run
 * @param args additional arguments for the command
 * @returns a command run result
 */
async function runSilently(command, ...args) {
    return runHelper(true, command, ...args);
}
exports.runSilently = runSilently;
//# sourceMappingURL=run.js.map