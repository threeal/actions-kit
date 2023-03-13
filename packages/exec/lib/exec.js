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
exports.execOut = exports.exec = void 0;
const actionsExec = __importStar(require("@actions/exec"));
const result_1 = require("./result");
async function exec(command, ...args) {
    const rc = await actionsExec.exec(command, args, {
        silent: true,
        ignoreReturnCode: true,
    });
    return new result_1.Result(rc);
}
exports.exec = exec;
async function execOut(commandLine, args) {
    const res = new result_1.Result();
    res.code = await actionsExec.exec(commandLine, args, {
        silent: true,
        ignoreReturnCode: true,
        listeners: {
            stdout: (data) => {
                res.output += data.toString();
            },
        },
    });
    return res;
}
exports.execOut = execOut;
//# sourceMappingURL=exec.js.map