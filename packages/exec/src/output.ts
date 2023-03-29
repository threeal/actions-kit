import * as exec from "@actions/exec";
import { RunResult } from "./run";

/** A command run and output get result */
export class OutputResult extends RunResult {
  /** The log output */
  output: string;

  /**
   * Constructs a new command run and output get result
   * @param code the status code
   * @param output the log output
   */
  constructor(code: number, output: string) {
    super(code);
    this.output = output;
  }
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
