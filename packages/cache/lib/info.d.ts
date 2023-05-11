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
