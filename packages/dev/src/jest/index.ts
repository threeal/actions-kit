import { Config } from "jest";
import { defaultJestConfig } from "./default";

/** Type representing the Jest configuration. */
export type JestConfig = Config;

/** Function type used to alter the Jest configuration. */
// eslint-disable-next-line no-unused-vars
export type AlterJestConfig = (config: JestConfig) => JestConfig;

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
