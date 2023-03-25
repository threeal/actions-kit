import * as actionsExec from "@actions/exec";
import { Result } from "./result";

async function execHelper(
  silent: boolean,
  command: string,
  ...args: string[]
): Promise<Result> {
  const rc = await actionsExec.exec(command, args, {
    ignoreReturnCode: true,
    silent,
  });
  return new Result(rc);
}

/**
 * Executes a command
 * @param command command to execute
 * @param args additional arguments for the command
 * @returns a command execution result
 */
export async function exec(
  command: string,
  ...args: string[]
): Promise<Result> {
  return execHelper(false, command, ...args);
}

/**
 * Executes a command silently
 * @param command command to execute
 * @param args additional arguments for the command
 * @returns a command execution result
 */
export async function execSilently(
  command: string,
  ...args: string[]
): Promise<Result> {
  return execHelper(true, command, ...args);
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
  const res = new Result();
  res.code = await actionsExec.exec(command, args, {
    silent: true,
    ignoreReturnCode: true,
    listeners: {
      stdout: (data: Buffer) => {
        res.output += data.toString();
      },
    },
  });
  return res;
}
