"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultJestConfig = void 0;
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
//# sourceMappingURL=default.js.map