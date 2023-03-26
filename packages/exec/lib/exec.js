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
exports.execOutSilently = exports.execOut = exports.runSilently = exports.run = void 0;
const exec = __importStar(require("@actions/exec"));
const result_1 = require("./result");
async function runHelper(silent, command, ...args) {
    const rc = await exec.exec(command, args, {
        ignoreReturnCode: true,
        silent,
    });
    return new result_1.Result(rc);
}
/**
 * Runs a command
 * @param command command to run
 * @param args additional arguments for the command
 * @returns a command run result
 */
async function run(command, ...args) {
    return runHelper(false, command, ...args);
}
exports.run = run;
/**
 * Runs a command silently
 * @param command command to run
 * @param args additional arguments for the command
 * @returns a command run result
 */
async function runSilently(command, ...args) {
    return runHelper(true, command, ...args);
}
exports.runSilently = runSilently;
async function execOutHelper(silent, command, ...args) {
    const res = new result_1.Result();
    res.code = await exec.exec(command, args, {
        ignoreReturnCode: true,
        listeners: {
            stdout: (data) => {
                res.output += data.toString();
            },
        },
        silent,
    });
    return res;
}
/**
 * Executes a command and gets the output
 * @param command command to execute
 * @param args additional arguments for the command
 * @returns a command execution result
 */
async function execOut(command, ...args) {
    return execOutHelper(false, command, ...args);
}
exports.execOut = execOut;
/**
 * Executes a command silently and gets the output
 * @param command command to execute
 * @param args additional arguments for the command
 * @returns a command execution result
 */
async function execOutSilently(command, ...args) {
    return execOutHelper(true, command, ...args);
}
exports.execOutSilently = execOutSilently;
//# sourceMappingURL=exec.js.map