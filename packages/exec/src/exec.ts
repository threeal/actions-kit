import * as exec from "@actions/exec";
import { Result } from "./result";

async function runHelper(
  silent: boolean,
  command: string,
  ...args: string[]
): Promise<Result> {
  const rc = await exec.exec(command, args, {
    ignoreReturnCode: true,
    silent,
  });
  return new Result(rc);
}

/**
 * Runs a command
 * @param command command to run
 * @param args additional arguments for the command
 * @returns a command run result
 */
export async function run(command: string, ...args: string[]): Promise<Result> {
  return runHelper(false, command, ...args);
}

/**
 * Runs a command silently
 * @param command command to run
 * @param args additional arguments for the command
 * @returns a command run result
 */
export async function runSilently(
  command: string,
  ...args: string[]
): Promise<Result> {
  return runHelper(true, command, ...args);
}

async function execOutHelper(
  silent: boolean,
  command: string,
  ...args: string[]
): Promise<Result> {
  const res = new Result();
  res.code = await exec.exec(command, args, {
    ignoreReturnCode: true,
    listeners: {
      stdout: (data: Buffer) => {
        res.output += data.toString();
      },
    },
    silent,
  });
  return res;
}

/**
 * Executes a command and gets the output
 * @param command command to execute
 * @param args additional arguments for the command
 * @returns a command execution result
 */
export async function execOut(
  command: string,
  ...args: string[]
): Promise<Result> {
  return execOutHelper(false, command, ...args);
}

/**
 * Executes a command silently and gets the output
 * @param command command to execute
 * @param args additional arguments for the command
 * @returns a command execution result
 */
export async function execOutSilently(
  command: string,
  ...args: string[]
): Promise<Result> {
  return execOutHelper(true, command, ...args);
}
