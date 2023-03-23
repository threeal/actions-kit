import * as core from "@actions/core";
import { Time } from "./internal";
import { info } from "./log";

/**
 * Wrap an asynchronous function call in a group.
 *
 * Returns the same type as the function itself.
 *
 * @param name The name of the group
 * @param fn The function to wrap in the group
 */
export async function group<T>(name: string, fn: () => Promise<T>): Promise<T> {
  const time = Time.now();
  core.startGroup(name);
  let res: T;
  try {
    res = await fn();
  } catch (err) {
    info(`Failed in ${time.elapsed()}`);
    core.endGroup();
    throw err;
  }
  info(`Done in ${time.elapsed()}`);
  core.endGroup();
  return res;
}
