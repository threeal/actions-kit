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
exports.createEslintConfig = void 0;
const deepmerge_1 = __importDefault(require("deepmerge"));
const jsonfile = __importStar(require("jsonfile"));
const default_1 = require("./default");
/**
 * Create an ESLint configuration with optional additional configuration or a function that alters the configuration.
 * This function also automatically creates a TypeScript configuration that will be used by the ESLint configuration.
 * @param config Optional additional configuration or a function that alters the configuration.
 * @returns The resulting ESLint configuration.
 */
function createEslintConfig(config) {
    // Write a TypeScript configuration for ESLint.
    jsonfile.writeFileSync("tsconfig.eslint.json", {
        extends: "./tsconfig.json",
        exclude: [],
    });
    return typeof config === "function"
        ? config(default_1.defaultEslintConfig)
        : (0, deepmerge_1.default)(default_1.defaultEslintConfig, config ?? {});
}
exports.createEslintConfig = createEslintConfig;
//# sourceMappingURL=index.js.map