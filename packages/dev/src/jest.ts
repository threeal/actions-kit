import { Config } from "jest";

/** Function type used to alter the Jest configuration. */
// eslint-disable-next-line no-unused-vars
type AlterConfig = (config: Config) => Config;

/** The default configuration for Jest. */
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

/**
 * Create a Jest configuration with optional additional configuration or a function that alters the configuration.
 * @param config Optional additional configuration or a function that alters the configuration.
 * @returns The resulting Jest configuration.
 */
export function jestConfig(config?: Config | AlterConfig): Config {
  return typeof config === "function"
    ? config(defaultJestConfig)
    : { ...defaultJestConfig, ...config };
}
