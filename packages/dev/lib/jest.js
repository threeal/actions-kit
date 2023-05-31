"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createJestConfig = exports.defaultJestConfig = void 0;
/** The default configuration for Jest. */
exports.defaultJestConfig = {
    clearMocks: true,
    collectCoverage: true,
    coveragePathIgnorePatterns: ["/lib/"],
    coverageThreshold: {
        global: {
            branches: 100,
            functions: 100,
            lines: 100,
            statements: 100,
        },
    },
    moduleFileExtensions: ["js", "ts"],
    testEnvironment: "node",
    testMatch: ["**/*.test.ts"],
    transform: {
        "^.+\\.ts$": "ts-jest",
    },
    verbose: true,
};
/**
 * Create a Jest configuration with optional additional configuration or a function that alters the configuration.
 * @param config Optional additional configuration or a function that alters the configuration.
 * @returns The resulting Jest configuration.
 */
function createJestConfig(config) {
    return typeof config === "function"
        ? config(exports.defaultJestConfig)
        : { ...exports.defaultJestConfig, ...config };
}
exports.createJestConfig = createJestConfig;
//# sourceMappingURL=jest.js.map