/** A command execution result */
export class Result {
  /** The status code */
  code: number = 0;

  /**
   * Constructs a new command execution result
   * @param code the optional status code
   */
  constructor(code?: number) {
    if (code !== undefined) this.code = code;
  }
}
