"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.saveCache = exports.restoreCache = void 0;
const tmp_1 = require("tmp");
const fs_extra_1 = require("fs-extra");
class Cache {
    constructor(path) {
        this.path = "";
        this.cachePath = "";
        this.path = path;
        this.cachePath = (0, tmp_1.tmpNameSync)();
    }
    save() {
        (0, fs_extra_1.copySync)(this.path, this.cachePath, { overwrite: true });
    }
    restore() {
        (0, fs_extra_1.copySync)(this.cachePath, this.path, { overwrite: true });
    }
}
const cachesMap = {};
async function restoreCache(paths, key) {
    if (!cachesMap.hasOwnProperty(key))
        return undefined;
    for (const cache of cachesMap[key]) {
        if (paths.includes(cache.path)) {
            cache.restore();
        }
    }
    return key;
}
exports.restoreCache = restoreCache;
async function saveCache(paths, key) {
    let caches = [];
    if (cachesMap.hasOwnProperty(key)) {
        caches = cachesMap[key];
    }
    for (const path of paths) {
        const cache = new Cache(path);
        cache.save();
        caches.push(cache);
    }
    cachesMap[key] = caches;
}
exports.saveCache = saveCache;
//# sourceMappingURL=index.js.map