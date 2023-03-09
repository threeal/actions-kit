import * as core from "@actions/core";

export function getStringInput(key: string): string | null {
  const val = core.getInput(key);
  return val.length > 0 ? val : null;
}
