import * as exec from "@actions/exec";
import { OutputResult, RunResult } from "./result";

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

async function outputHelper(
  silent: boolean,
  command: string,
  ...args: string[]
): Promise<OutputResult> {
  const res = await exec.getExecOutput(command, args, {
    ignoreReturnCode: true,
    silent,
  });
  return new OutputResult(res.exitCode, res.stdout);
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
): Promise<OutputResult> {
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
): Promise<OutputResult> {
  return outputHelper(true, command, ...args);
}
