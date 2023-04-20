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
export declare function getBooleanInput(key: string): boolean | undefined;
export declare function getNumberInput(key: string): number | undefined;
