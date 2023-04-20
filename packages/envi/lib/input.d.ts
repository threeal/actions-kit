/**
 * Gets the string value of an input.
 * Returns undefined if the input is empty or not defined.
 *
 * @param key key of the input
 * @returns string or undefined
 */
export declare function getStringInput(key: string): string | undefined;
/**
 * Gets the multiline string value of an input.
 * Returns empty list if the input is not defined.
 *
 * @param key key of the input
 * @returns list of string
 */
export declare function getMultilineInput(key: string): string[];
/**
 * Gets the boolean value of an input.
 * Supports `true` and `false` input case insensitively.
 * Returns undefined if the input is invalid or not defined.
 *
 * @param key key of the input
 * @returns boolean or undefined
 */
export declare function getBooleanInput(key: string): boolean | undefined;
/**
 * Gets the number value of an input.
 * Returns undefined if the input is empty or not defined.
 *
 * @param key key of the input
 * @returns number or undefined
 */
export declare function getNumberInput(key: string): number | undefined;
