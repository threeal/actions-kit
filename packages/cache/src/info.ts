import * as fs from "fs";
import * as jsonfile from "jsonfile";
import * as os from "os";
import * as path from "path";
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

const root = path.join(os.homedir(), ".cache/info");

/**
 * Saves a cache info object to the cache.
 *
 * @param key a key for restoring the cache info object
 * @param info a cache info object
 * @throws an error if save fails
 */
export async function saveInfo(key: string, info: Info) {
  if (!fs.existsSync(root)) fs.mkdirSync(root);
  const file = path.join(root, `${key}.json`);
  jsonfile.writeFileSync(file, info);
  return save(key, [file]);
}

/**
 * Restores a cache info object from the cache.
 *
 * @param key a key for restoring the cache info object
 * @returns a cache info object or `undefined`
 */
export async function restoreInfo(key: string): Promise<Info | undefined> {
  const file = path.join(root, `${key}.json`);
  const success = await restore(key, [file]);
  if (!success) return undefined;
  const res = jsonfile.readFileSync(file) as Info;
  return new Info(res.key, res.paths);
}
