import { RunResult, Result } from "./result";
import { output, outputSilently, run, runSilently } from "./run";

/** A helper for running a command */
export class Command {
  /** The command to run */
  command: string;

  /** Additional arguments for the command */
  args: string[];

  /**
   * Constructs a new helper for running a command
   * @param command a command to run
   * @param args additional arguments for the command
   */
  constructor(command: string, ...args: string[]) {
    this.command = command;
    this.args = args;
  }

  /**
   * Runs the command
   * @param args additional arguments for the command
   * @returns a command run result
   */
  async run(...args: string[]): Promise<RunResult> {
    return run(this.command, ...this.args.concat(args));
  }

  /**
   * Runs the command silently
   * @param args additional arguments for the command
   * @returns a command run result
   */
  async runSilently(...args: string[]): Promise<RunResult> {
    return runSilently(this.command, ...this.args.concat(args));
  }

  /**
   * Runs the command and gets the output
   * @param args additional arguments for the command
   * @returns a command run result
   */
  async output(...args: string[]): Promise<Result> {
    return output(this.command, ...this.args.concat(args));
  }

  /**
   * Runs the command silently and gets the output
   * @param args additional arguments for the command
   * @returns a command run result
   */
  async outputSilently(...args: string[]): Promise<Result> {
    return outputSilently(this.command, ...this.args.concat(args));
  }
}
