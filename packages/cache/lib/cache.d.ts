/**
 * Saves files to the cache with a specified key.
 *
 * @param key a key for restoring the cache
 * @param paths a list of file paths to be saved (may contains wildcards)
 * @throws an error if save fails
 */
export declare function save(key: string, paths: string[]): Promise<void>;
