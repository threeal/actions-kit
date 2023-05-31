import { Config } from "jest";
/** Type representing the Jest configuration. */
export type JestConfig = Config;
/** Function type used to alter the Jest configuration. */
export type AlterJestConfig = (config: JestConfig) => JestConfig;
/** The default configuration for Jest. */
export declare const defaultJestConfig: JestConfig;
/**
 * Create a Jest configuration with optional additional configuration or a function that alters the configuration.
 * @param config Optional additional configuration or a function that alters the configuration.
 * @returns The resulting Jest configuration.
 */
export declare function jestConfig(config?: JestConfig | AlterJestConfig): JestConfig;
