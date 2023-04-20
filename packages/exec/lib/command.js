"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Command = void 0;
const output_1 = require("./output");
const run_1 = require("./run");
/** A helper for running a command */
class Command {
    /**
     * Constructs a new helper for running a command
     * @param command a command to run
     * @param args additional arguments for the command
     */
    constructor(command, ...args) {
        this.command = command;
        this.args = args;
    }
    /**
     * Runs the command
     * @param args additional arguments for the command
     * @returns a command run result
     */
    async run(...args) {
        return (0, run_1.run)(this.command, ...this.args.concat(args));
    }
    /**
     * Runs the command silently
     * @param args additional arguments for the command
     * @returns a command run result
     */
    async runSilently(...args) {
        return (0, run_1.runSilently)(this.command, ...this.args.concat(args));
    }
    /**
     * Runs the command and gets the output
     * @param args additional arguments for the command
     * @returns a command run result
     */
    async output(...args) {
        return (0, output_1.output)(this.command, ...this.args.concat(args));
    }
    /**
     * Runs the command silently and gets the output
     * @param args additional arguments for the command
     * @returns a command run result
     */
    async outputSilently(...args) {
        return (0, output_1.outputSilently)(this.command, ...this.args.concat(args));
    }
}
exports.Command = Command;
//# sourceMappingURL=command.js.map