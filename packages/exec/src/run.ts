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
 * @param command a command to run
 * @param args additional arguments for the command
 * @returns a command run result
 */
export async function run(command: string, ...args: string[]): Promise<Result> {
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
): Promise<Result> {
  return runHelper(true, command, ...args);
}

async function outputHelper(
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
 * Runs a command and gets the output
 * @param command a command to run
 * @param args additional arguments for the command
 * @returns a command run result
 */
export async function output(
  command: string,
  ...args: string[]
): Promise<Result> {
  return outputHelper(false, command, ...args);
}

/**
 * Runs a command silently and gets the output
 * @param command a command to run
 * @param args additional arguments for the command
 * @returns a command run result
 */
export async function outputSilently(
  command: string,
  ...args: string[]
): Promise<Result> {
  return outputHelper(true, command, ...args);
}
