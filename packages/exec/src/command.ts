export class Command {
  command: string;
  args: string[];

  constructor(command: string, ...args: string[]) {
    this.command = command;
    this.args = args;
  }
}
