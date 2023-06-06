/** Function type used to alter the ESLint configuration. */
export type AlterEslintConfig = (config: object) => object;
/**
 * Create an ESLint configuration with optional additional configuration or a function that alters the configuration.
 * This function also automatically creates a TypeScript configuration that will be used by the ESLint configuration.
 * @param config Optional additional configuration or a function that alters the configuration.
 * @returns The resulting ESLint configuration.
 */
export declare function createEslintConfig(config?: object | AlterEslintConfig): object;
