import { Config } from "jest";

export function jestConfig(config?: Config): Config {
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
