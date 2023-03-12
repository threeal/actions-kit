import { Result } from "./result";
export declare function exec(commandLine: string, args?: string[]): Promise<Result>;
export declare function execOut(commandLine: string, args?: string[]): Promise<Result>;
