"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pip = exports.uninstallPackage = exports.installPackage = exports.showPackageInfo = exports.PackageInfo = void 0;
var info_1 = require("./info");
Object.defineProperty(exports, "PackageInfo", { enumerable: true, get: function () { return info_1.PackageInfo; } });
Object.defineProperty(exports, "showPackageInfo", { enumerable: true, get: function () { return info_1.showPackageInfo; } });
var install_1 = require("./install");
Object.defineProperty(exports, "installPackage", { enumerable: true, get: function () { return install_1.installPackage; } });
Object.defineProperty(exports, "uninstallPackage", { enumerable: true, get: function () { return install_1.uninstallPackage; } });
var pip_1 = require("./pip");
Object.defineProperty(exports, "pip", { enumerable: true, get: function () { return pip_1.pip; } });
//# sourceMappingURL=index.js.map