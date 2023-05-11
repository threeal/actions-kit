/** A cache info object */
export declare class Info {
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
    constructor(key: string, paths: string[]);
    /**
     * Saves files to the cache.
     *
     * @throws an error if save fails
     */
    save(): Promise<void>;
    /**
     * Restores files from the cache.
     *
     * @returns `true` if the files were successfully restored, `false` otherwise
     */
    restore(): Promise<boolean>;
}
/**
 * Saves a cache info object to the cache.
 *
 * @param key a key for restoring the cache info object
 * @param info a cache info object
 * @throws an error if save fails
 */
export declare function saveInfo(key: string, info: Info): Promise<void>;
/**
 * Restores a cache info object from the cache.
 *
 * @param key a key for restoring the cache info object
 * @returns a cache info object or `undefined`
 */
export declare function restoreInfo(key: string): Promise<Info | undefined>;
