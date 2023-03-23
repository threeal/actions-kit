import { Duration } from "./duration";
export declare class Time {
    ms: number;
    constructor(ms: number);
    static now(): Time;
    elapsed(): Duration;
}
