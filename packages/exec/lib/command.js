"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Command = void 0;
const exec_1 = require("./exec");
/** A helper for executing a command */
class Command {
    /**
     * Constructs a new helper for executing a command
     * @param command command to execute
     * @param args additional arguments for the command
     */
    constructor(command, ...args) {
        this.command = command;
        this.args = args;
    }
    /**
     * Executes the command
     * @param args additional arguments for the command
     * @returns a command execution result
     */
    async exec(...args) {
        return (0, exec_1.run)(this.command, ...this.args.concat(args));
    }
    /**
     * Executes the command silently
     * @param args additional arguments for the command
     * @returns a command execution result
     */
    async execSilently(...args) {
        return (0, exec_1.runSilently)(this.command, ...this.args.concat(args));
    }
    /**
     * Executes the command and gets the output
     * @param args additional arguments for the command
     * @returns a command execution result
     */
    async execOut(...args) {
        return (0, exec_1.execOut)(this.command, ...this.args.concat(args));
    }
    /**
     * Executes the command silently and gets the output
     * @param args additional arguments for the command
     * @returns a command execution result
     */
    async execOutSilently(...args) {
        return (0, exec_1.execOutSilently)(this.command, ...this.args.concat(args));
    }
}
exports.Command = Command;
//# sourceMappingURL=command.js.map