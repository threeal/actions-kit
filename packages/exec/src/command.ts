import { exec, execOut } from "./exec";
import { Result } from "./result";

export class Command {
  command: string;
  args: string[];

  constructor(command: string, ...args: string[]) {
    this.command = command;
    this.args = args;
  }

  async exec(...args: string[]): Promise<Result> {
    return exec(this.command, ...this.args.concat(args));
  }

  async execOut(...args: string[]): Promise<Result> {
    return execOut(this.command, ...this.args.concat(args));
  }
}