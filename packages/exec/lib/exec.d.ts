import { Result } from "./result";
export declare function exec(commandLine: string, args?: string[]): Promise<void>;
export declare function execOut(commandLine: string, args?: string[]): Promise<string>;
export declare function execCheck(commandLine: string, args?: string[]): Promise<Result>;
export declare function execOutCheck(commandLine: string, args?: string[]): Promise<Result>;
