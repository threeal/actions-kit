/** A command run result */
export class RunResult {
  /** The status code */
  code: number;

  /**
   * Constructs a new command run result
   * @param code the status code
   */
  constructor(code: number) {
    this.code = code;
  }

  /**
   * Checks if the status is ok (status code is `0`)
   * @returns `true` if the status is ok
   */
  isOk(): boolean {
    return this.code === 0;
  }
}

/** A command run and output get result */
export class OutputResult extends RunResult {
  /** The log output */
  output: string;

  /**
   * Constructs a new command run and output get result
   * @param code the status code
   * @param output the log output
   */
  constructor(code: number, output: string) {
    super(code);
    this.output = output;
  }
}
