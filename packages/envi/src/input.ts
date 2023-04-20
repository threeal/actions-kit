import * as core from "@actions/core";

export function getStringInput(key: string): string | undefined {
  const val = core.getInput(key);
  return val.length > 0 ? val : undefined;
}

export function getMultilineInput(key: string): string[] {
  return core.getMultilineInput(key);
}

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

export function getNumberInput(key: string): number | undefined {
  const val = getStringInput(key);
  if (val === undefined) return undefined;
  return parseInt(val, 10);
}
