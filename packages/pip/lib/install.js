"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.uninstallPackage = exports.installPackage = void 0;
const pip_1 = require("./pip");
async function installPackage(packageName) {
    const res = await pip_1.pip.exec("install", packageName);
    if (!res.isOk()) {
        throw new Error(`Failed to install pip package: ${packageName} (error code: ${res.code})`);
    }
}
exports.installPackage = installPackage;
async function uninstallPackage(packageName) {
    await pip_1.pip.exec("uninstall", "-y", packageName);
}
exports.uninstallPackage = uninstallPackage;
//# sourceMappingURL=install.js.map