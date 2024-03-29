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
exports.getNumberInput = exports.getBooleanInput = exports.getMultilineInput = exports.getStringInput = void 0;
const core = __importStar(require("@actions/core"));
/**
 * Gets the string value of an input.
 * Returns undefined if the input is empty or not defined.
 *
 * @param key key of the input
 * @returns string or undefined
 */
function getStringInput(key) {
    const val = core.getInput(key);
    return val.length > 0 ? val : undefined;
}
exports.getStringInput = getStringInput;
/**
 * Gets the multiline string value of an input.
 * Returns empty list if the input is not defined.
 *
 * @param key key of the input
 * @returns list of string
 */
function getMultilineInput(key) {
    return core.getMultilineInput(key);
}
exports.getMultilineInput = getMultilineInput;
/**
 * Gets the boolean value of an input.
 * Supports `true` and `false` input case insensitively.
 * Returns undefined if the input is invalid or not defined.
 *
 * @param key key of the input
 * @returns boolean or undefined
 */
function getBooleanInput(key) {
    const val = getStringInput(key);
    if (val === undefined) {
        return undefined;
    }
    switch (val.toLowerCase()) {
        case "true":
            return true;
        case "false":
            return false;
    }
    return undefined;
}
exports.getBooleanInput = getBooleanInput;
/**
 * Gets the number value of an input.
 * Returns undefined if the input is empty or not defined.
 *
 * @param key key of the input
 * @returns number or undefined
 */
function getNumberInput(key) {
    const val = getStringInput(key);
    if (val === undefined)
        return undefined;
    return parseInt(val, 10);
}
exports.getNumberInput = getNumberInput;
//# sourceMappingURL=input.js.map