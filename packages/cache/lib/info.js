"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.restoreInfo = exports.saveInfo = exports.Info = void 0;
const fs = __importStar(require("fs"));
const jsonfile = __importStar(require("jsonfile"));
const os = __importStar(require("os"));
const path = __importStar(require("path"));
const cache_1 = require("./cache");
/** A cache info object */
class Info {
    /**
     * Constructs a new cache info object
     *
     * @param key a key of the cache
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
const root = path.join(os.homedir(), ".cache/info");
/**
 * Saves a cache info object to the cache.
 *
 * @param key a key of the cache
 * @param info a cache info object
 * @throws an error if save fails
 */
async function saveInfo(key, info) {
    if (!fs.existsSync(root))
        fs.mkdirSync(root);
    const file = path.join(root, `${key}.json`);
    jsonfile.writeFileSync(file, info);
    return (0, cache_1.save)(key, [file]);
}
exports.saveInfo = saveInfo;
/**
 * Restores a cache info object from the cache.
 *
 * @param key a key of the cache
 * @returns a cache info object or `undefined`
 */
async function restoreInfo(key) {
    const file = path.join(root, `${key}.json`);
    const success = await (0, cache_1.restore)(key, [file]);
    if (!success)
        return undefined;
    const res = jsonfile.readFileSync(file);
    return new Info(res.key, res.paths);
}
exports.restoreInfo = restoreInfo;
//# sourceMappingURL=info.js.map