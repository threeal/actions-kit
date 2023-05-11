"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Info = void 0;
const cache_1 = require("./cache");
/** A cache info object */
class Info {
    /**
     * Constructs a new cache info object
     *
     * @param key a key for restoring the cache
     * @param paths a list of file paths to be cached (may contains glob expressions)
     */
    constructor(key, paths) {
        this.key = key;
        this.paths = paths;
    }
    /**
     * Saves files to the cache.
     *
     * @throws an error if save fails
     */
    async save() {
        return (0, cache_1.save)(this.key, this.paths);
    }
    /**
     * Restores files from the cache.
     *
     * @returns `true` if the files were successfully restored, `false` otherwise
     */
    async restore() {
        return (0, cache_1.restore)(this.key, this.paths);
    }
}
exports.Info = Info;
//# sourceMappingURL=info.js.map