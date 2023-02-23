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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.error = exports.warning = exports.info = void 0;
const core = __importStar(require("@actions/core"));
const ansi_styles_1 = __importDefault(require("ansi-styles"));
var core_1 = require("@actions/core");
Object.defineProperty(exports, "info", { enumerable: true, get: function () { return core_1.info; } });
function warning(message) {
    const label = `${ansi_styles_1.default.yellow.open}Warning:${ansi_styles_1.default.yellow.close}`;
    core.info(`${label} ${message}`);
}
exports.warning = warning;
function error(message) {
    const label = `${ansi_styles_1.default.red.open}Error:${ansi_styles_1.default.red.close}`;
    core.info(`${label} ${message}`);
}
exports.error = error;
//# sourceMappingURL=log.js.map