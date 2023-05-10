"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Info = void 0;
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
}
exports.Info = Info;
//# sourceMappingURL=info.js.map