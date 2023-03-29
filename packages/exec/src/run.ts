import * as exec from "@actions/exec";
import { RunResult } from "./result";

async function runHelper(
  silent: boolean,
  command: string,
  ...args: string[]
): Promise<RunResult> {
  const rc = await exec.exec(command, args, {
    ignoreReturnCode: true,
    silent,
  });
  return new RunResult(rc);
}

/**
 * Runs a command
 * @param command a command to run
 * @param args additional arguments for the command
 * @returns a command run result
 */
export async function run(
  command: string,
  ...args: string[]
): Promise<RunResult> {
  return runHelper(false, command, ...args);
}

/**
 * Runs a command silently
 * @param command a command to run
 * @param args additional arguments for the command
 * @returns a command run result
 */
export async function runSilently(
  command: string,
  ...args: string[]
): Promise<RunResult> {
  return runHelper(true, command, ...args);
}
