import { exec, execOut, execSilently } from "./exec";
import { Result } from "./result";

/** A helper for executing a command */
export class Command {
  /** Command to execute */
  command: string;

  /** Additional arguments for the command */
  args: string[];

  /**
   * Constructs a new helper for executing a command
   * @param command command to execute
   * @param args additional arguments for the command
   */
  constructor(command: string, ...args: string[]) {
    this.command = command;
    this.args = args;
  }

  /**
   * Executes the command
   * @param args additional arguments for the command
   * @returns a command execution result
   */
  async exec(...args: string[]): Promise<Result> {
    return exec(this.command, ...this.args.concat(args));
  }

  /**
   * Executes the command silently
   * @param args additional arguments for the command
   * @returns a command execution result
   */
  async execSilently(...args: string[]): Promise<Result> {
    return execSilently(this.command, ...this.args.concat(args));
  }

  /**
   * Executes the command and gets the output
   * @param args additional arguments for the command
   * @returns a command execution result
   */
  async execOut(...args: string[]): Promise<Result> {
    return execOut(this.command, ...this.args.concat(args));
  }
}
