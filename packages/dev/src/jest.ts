import { Config } from "jest";

/**
 * The default configuration for Jest.
 */
export const defaultJestConfig: Config = {
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

export function jestConfig(config?: Config): Config {
  return {
    ...defaultJestConfig,
    ...config,
  };
}
