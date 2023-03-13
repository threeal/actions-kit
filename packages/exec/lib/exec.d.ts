import { Result } from "./result";
export declare function exec(command: string, ...args: string[]): Promise<Result>;
export declare function execOut(commandLine: string, args?: string[]): Promise<Result>;
