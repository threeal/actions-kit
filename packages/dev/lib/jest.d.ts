import { Config } from "jest";
/** Function type used to alter the Jest configuration. */
type AlterConfig = (config: Config) => Config;
/** The default configuration for Jest. */
export declare const defaultJestConfig: Config;
/**
 * Create a Jest configuration with optional additional configuration or a function that alters the configuration.
 * @param config Optional additional configuration or a function that alters the configuration.
 * @returns The resulting Jest configuration.
 */
export declare function jestConfig(config?: Config | AlterConfig): Config;
export {};
