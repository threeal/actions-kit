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
exports.restore = exports.save = void 0;
const cache = __importStar(require("@actions/cache"));
/**
 * Saves files to the cache with a specified key.
 *
 * @param key a key for restoring the cache
 * @param paths a list of file paths to be saved (may contains wildcards)
 * @throws an error if save fails
 */
async function save(key, paths) {
    await cache.saveCache(paths, key);
}
exports.save = save;
/**
 * Restores files from the cache with a specified key.
 *
 * @param key a key for restoring the cache
 * @param paths a list of file paths to be restored (may contains wildcards)
 * @returns `true` if the files were successfully restored, `false` otherwise
 */
async function restore(key, paths) {
    const restoredKey = await cache.restoreCache(paths, key);
    return restoredKey !== undefined;
}
exports.restore = restore;
//# sourceMappingURL=cache.js.map