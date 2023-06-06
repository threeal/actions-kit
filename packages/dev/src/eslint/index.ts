import merge from "deepmerge";
import * as jsonfile from "jsonfile";
import { defaultEslintConfig } from "./default";

/** Function type used to alter the ESLint configuration. */
// eslint-disable-next-line no-unused-vars
export type AlterEslintConfig = (config: object) => object;

/**
 * Create an ESLint configuration with optional additional configuration or a function that alters the configuration.
 * This function also automatically creates a TypeScript configuration that will be used by the ESLint configuration.
 * @param config Optional additional configuration or a function that alters the configuration.
 * @returns The resulting ESLint configuration.
 */
export function createEslintConfig(
  config?: object | AlterEslintConfig
): object {
  // Write a TypeScript configuration for ESLint.
  jsonfile.writeFileSync("tsconfig.eslint.json", {
    extends: "./tsconfig.json",
    exclude: [],
  });
  return typeof config === "function"
    ? config(defaultEslintConfig)
    : merge(defaultEslintConfig, config ?? {});
}
