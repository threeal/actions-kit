import { Result } from "./result";
export declare class Command {
    command: string;
    args: string[];
    constructor(command: string, ...args: string[]);
    exec(...args: string[]): Promise<Result>;
}
