import { Config } from "jest";

/** Type representing the Jest configuration. */
export type JestConfig = Config;

/** Function type used to alter the Jest configuration. */
// eslint-disable-next-line no-unused-vars
export type AlterJestConfig = (config: JestConfig) => JestConfig;

/** The default configuration for Jest. */
export const defaultJestConfig: JestConfig = {
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
export function createJestConfig(
  config?: JestConfig | AlterJestConfig
): JestConfig {
  return typeof config === "function"
    ? config(defaultJestConfig)
    : { ...defaultJestConfig, ...config };
}
