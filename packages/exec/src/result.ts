/** A command execution result */
export class Result {
  /** The status code */
  code: number = 0;

  /** The log output */
  output: string = "";

  /**
   * Constructs a new command execution result
   * @param code the optional status code
   */
  constructor(code?: number) {
    if (code !== undefined) this.code = code;
  }

  /**
   * Checks if the status is ok (status code is `0`)
   * @returns `true` if the status is ok
   */
  isOk(): boolean {
    return this.code === 0;
  }
}
