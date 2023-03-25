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
exports.showPackageInfo = exports.PackageInfo = void 0;
const io = __importStar(require("@actions/io"));
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const pip_1 = require("./pip");
function isPackageDirectory(directory, pacageName) {
    return directory.toLowerCase().includes(pacageName.toLowerCase());
}
class PackageInfo {
    constructor() {
        this.name = "";
        this.version = "";
        this.location = "";
        this.requires = [];
        this.files = [];
    }
    directories() {
        const dirs = [];
        for (const file of this.files) {
            const strs = file.split(path.sep);
            const dir = strs[0];
            if (dirs.includes(dir))
                continue;
            if (isPackageDirectory(dir, this.name))
                dirs.push(dir);
        }
        const absDirs = [];
        for (const dir of dirs) {
            const absDir = path.join(this.location, dir);
            if (fs.existsSync(absDir))
                absDirs.push(absDir);
        }
        return absDirs;
    }
    async executables() {
        const executables = [];
        for (const file of this.files) {
            const strs = file.split(path.sep);
            // check if it's package directory
            if (strs.length > 0 && isPackageDirectory(strs[0], this.name))
                continue;
            const executable = path.basename(file);
            const absExecutable = await io.which(executable, true);
            executables.push(absExecutable);
        }
        return executables;
    }
}
exports.PackageInfo = PackageInfo;
async function showPackageInfo(packageName) {
    const res = await pip_1.pip.execOut("show", "-f", packageName);
    if (!res.isOk())
        return undefined;
    const lines = res.output.split("\n");
    const packageInfo = new PackageInfo();
    for (let i = 0; i < lines.length - 1; ++i) {
        const strs = lines[i].split(/:(.*)/s);
        if (strs.length >= 1 && strs[0] === "Files") {
            for (let j = i + 1; j < lines.length; ++j) {
                const line = lines[j].trim();
                // Check if the first line does not contain this error message
                if (line.length > 0 && !line.includes("Cannot locate")) {
                    packageInfo.files.push(line);
                }
            }
            break;
        }
        else if (strs.length >= 2) {
            switch (strs[0]) {
                case "Name":
                    packageInfo.name = strs[1].trim();
                    break;
                case "Version":
                    packageInfo.version = strs[1].trim();
                    break;
                case "Location":
                    packageInfo.location = strs[1].trim();
                    break;
                case "Requires":
                    packageInfo.requires = strs[1]
                        .split(",")
                        .map((str) => str.trim())
                        .filter((str) => str.length > 0);
                    break;
            }
        }
    }
    return packageInfo;
}
exports.showPackageInfo = showPackageInfo;
//# sourceMappingURL=info.js.map