/** A cache info object */
export class Info {
  /** a key for restoring the cache */
  key: string;

  /** a list of file paths to be cached (may contains glob expressions) */
  paths: string[];

  /**
   * Constructs a new cache info object
   *
   * @param key a key for restoring the cache
   * @param paths a list of file paths to be cached (may contains glob expressions)
   */
  constructor(key: string, paths: string[]) {
    this.key = key;
    this.paths = paths;
  }
}
