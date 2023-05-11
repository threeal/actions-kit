import { restore, save } from "./cache";

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

  /**
   * Saves files to the cache.
   *
   * @throws an error if save fails
   */
  async save() {
    return save(this.key, this.paths);
  }

  /**
   * Restores files from the cache.
   *
   * @returns `true` if the files were successfully restored, `false` otherwise
   */
  async restore(): Promise<boolean> {
    return restore(this.key, this.paths);
  }
}
