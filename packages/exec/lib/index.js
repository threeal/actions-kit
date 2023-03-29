"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.runSilently = exports.run = exports.RunResult = exports.OutputResult = exports.outputSilently = exports.output = exports.Command = void 0;
var command_1 = require("./command");
Object.defineProperty(exports, "Command", { enumerable: true, get: function () { return command_1.Command; } });
var output_1 = require("./output");
Object.defineProperty(exports, "output", { enumerable: true, get: function () { return output_1.output; } });
Object.defineProperty(exports, "outputSilently", { enumerable: true, get: function () { return output_1.outputSilently; } });
var result_1 = require("./result");
Object.defineProperty(exports, "OutputResult", { enumerable: true, get: function () { return result_1.OutputResult; } });
Object.defineProperty(exports, "RunResult", { enumerable: true, get: function () { return result_1.RunResult; } });
var run_1 = require("./run");
Object.defineProperty(exports, "run", { enumerable: true, get: function () { return run_1.run; } });
Object.defineProperty(exports, "runSilently", { enumerable: true, get: function () { return run_1.runSilently; } });
//# sourceMappingURL=index.js.map