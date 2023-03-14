"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Command = void 0;
const exec_1 = require("./exec");
class Command {
    constructor(command, ...args) {
        this.command = command;
        this.args = args;
    }
    async exec(...args) {
        return (0, exec_1.exec)(this.command, ...this.args.concat(args));
    }
}
exports.Command = Command;
//# sourceMappingURL=command.js.map