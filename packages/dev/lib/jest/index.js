"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createJestConfig = void 0;
const default_1 = require("./default");
/**
 * Create a Jest configuration with optional additional configuration or a function that alters the configuration.
 * @param config Optional additional configuration or a function that alters the configuration.
 * @returns The resulting Jest configuration.
 */
function createJestConfig(config) {
    return typeof config === "function"
        ? config(default_1.defaultJestConfig)
        : { ...default_1.defaultJestConfig, ...config };
}
exports.createJestConfig = createJestConfig;
//# sourceMappingURL=index.js.map