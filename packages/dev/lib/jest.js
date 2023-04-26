"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.jestConfig = void 0;
function jestConfig(config) {
    return {
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
        runner: "jest-serial-runner",
        testEnvironment: "node",
        testMatch: ["**/*.test.ts"],
        transform: {
            "^.+\\.ts$": "ts-jest",
        },
        verbose: true,
        ...config,
    };
}
exports.jestConfig = jestConfig;
//# sourceMappingURL=jest.js.map