import * as core from "@actions/core";

/**
 * Wrap an asynchronous function call in a group.
 *
 * Returns the same type as the function itself.
 *
 * @param name The name of the group
 * @param fn The function to wrap in the group
 */
export async function group<T>(name: string, fn: () => Promise<T>): Promise<T> {
  core.startGroup(name);
  const res = await fn();
  core.endGroup();
  return res;
}
