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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PackageContentCacheInfo = exports.PackageCacheInfo = void 0;
const cache = __importStar(require("@actions/cache"));
const fs = __importStar(require("fs"));
const hash_it_1 = __importDefault(require("hash-it"));
const jsonfile = __importStar(require("jsonfile"));
const os = __importStar(require("os"));
const path = __importStar(require("path"));
const info_1 = require("./info");
class PackageCacheInfo {
    constructor(packageName) {
        this.name = "";
        this.key = "";
        this.path = "";
        this.name = packageName;
        this.key = `deps-pip-${os.type()}-${packageName}`;
        const root = PackageCacheInfo.root();
        this.path = path.join(root, `${packageName}.json`);
    }
    async accumulateContentInfo() {
        return await PackageContentCacheInfo.accumulate(this.name);
    }
    async saveContentInfo(contentInfo) {
        PackageCacheInfo.createRoot();
        jsonfile.writeFileSync(this.path, contentInfo);
        await cache.saveCache([this.path], this.key);
    }
    async restoreContentInfo() {
        const restoreKey = await cache.restoreCache([this.path], this.key);
        if (restoreKey === undefined)
            return undefined;
        const contentInfo = new PackageContentCacheInfo();
        Object.assign(contentInfo, jsonfile.readFileSync(this.path));
        return contentInfo;
    }
    static root() {
        return path.join(os.homedir(), ".pip_cache_info");
    }
    static createRoot() {
        const root = PackageCacheInfo.root();
        if (!fs.existsSync(root))
            fs.mkdirSync(root);
    }
}
exports.PackageCacheInfo = PackageCacheInfo;
class PackageContentCacheInfo {
    constructor() {
        this.name = "";
        this.key = "";
        this.paths = [];
    }
    static async accumulate(packageName) {
        const cacheInfo = new PackageContentCacheInfo();
        cacheInfo.name = packageName;
        cacheInfo.paths = await PackageContentCacheInfo.accumulatePaths(packageName);
        cacheInfo.key =
            `deps-pip-${os.type()}-${packageName}` +
                `-content-${(0, hash_it_1.default)(cacheInfo.paths)}`;
        return cacheInfo;
    }
    static async accumulatePaths(packageName) {
        const packageInfo = await (0, info_1.showPackageInfo)(packageName);
        if (packageInfo === undefined) {
            throw new Error(`Could not get cache paths of unknown package: ${packageName}`);
        }
        const executables = await packageInfo.executables();
        let paths = executables.concat(packageInfo.directories());
        for (const dep of packageInfo.requires) {
            const depPaths = await PackageContentCacheInfo.accumulatePaths(dep);
            paths = paths.concat(depPaths);
        }
        return paths;
    }
    async save() {
        await cache.saveCache([...this.paths], this.key);
    }
    async restore() {
        return await cache.restoreCache([...this.paths], this.key);
    }
}
exports.PackageContentCacheInfo = PackageContentCacheInfo;
//# sourceMappingURL=cache.js.map