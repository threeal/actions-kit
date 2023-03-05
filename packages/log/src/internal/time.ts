import { Duration } from "./duration";

export class Time {
  ms: number;

  constructor(ms: number) {
    this.ms = ms;
  }

  static now(): Time {
    return new Time(Date.now());
  }

  elapsed(): Duration {
    return new Duration(Date.now() - this.ms);
  }
}
