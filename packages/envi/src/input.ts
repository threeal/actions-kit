import * as core from "@actions/core";

/**
 * Gets the string value of an input.
 * Returns undefined if the input is empty or not defined.
 *
 * @param key key of the input
 * @returns string or undefined
 */
export function getStringInput(key: string): string | undefined {
  const val = core.getInput(key);
  return val.length > 0 ? val : undefined;
}

/**
 * Gets the multiline string value of an input.
 * Returns empty list if the input is not defined.
 *
 * @param key key of the input
 * @returns list of string
 */
export function getMultilineInput(key: string): string[] {
  return core.getMultilineInput(key);
}

/**
 * Gets the boolean value of an input.
 * Supports `true` and `false` input case insensitively.
 * Returns undefined if the input is invalid or not defined.
 *
 * @param key key of the input
 * @returns boolean or undefined
 */
export function getBooleanInput(key: string): boolean | undefined {
  const val = getStringInput(key);
  if (val === undefined) {
    return undefined;
  }
  switch (val.toLowerCase()) {
    case "true":
      return true;
    case "false":
      return false;
  }
  return undefined;
}

/**
 * Gets the number value of an input.
 * Returns undefined if the input is empty or not defined.
 *
 * @param key key of the input
 * @returns number or undefined
 */
export function getNumberInput(key: string): number | undefined {
  const val = getStringInput(key);
  if (val === undefined) return undefined;
  return parseInt(val, 10);
}
