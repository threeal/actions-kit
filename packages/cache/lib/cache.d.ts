/**
 * Saves files to the cache with a specified key.
 *
 * @param key a key for restoring the cache
 * @param paths a list of file paths to be saved (may contains glob expressions)
 * @throws an error if save fails
 */
export declare function save(key: string, paths: string[]): Promise<void>;
/**
 * Restores files from the cache with a specified key.
 *
 * @param key a key for restoring the cache
 * @param paths a list of file paths to be restored (may contains glob expressions)
 * @returns `true` if the files were successfully restored, `false` otherwise
 */
export declare function restore(key: string, paths: string[]): Promise<boolean>;
