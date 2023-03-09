import * as core from "@actions/core";

export function getStringInput(key: string): string | null {
  const val = core.getInput(key);
  return val.length > 0 ? val : null;
}

export function getNumberInput(key: string): number | null {
  const val = getStringInput(key);
  if (val === null) return null;
  return parseInt(val, 10);
}
