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
exports.eslintConfig = void 0;
const jsonfile = __importStar(require("jsonfile"));
function eslintConfig(config) {
    jsonfile.writeFileSync("tsconfig.eslint.json", {
        extends: "./tsconfig.json",
        exclude: [],
    });
    return {
        plugins: ["@typescript-eslint", "jest"],
        extends: ["plugin:github/recommended"],
        parser: "@typescript-eslint/parser",
        parserOptions: {
            ecmaVersion: 9,
            project: "tsconfig.eslint.json",
            sourceType: "module",
        },
        rules: {
            camelcase: "off",
            "i18n-text/no-en": "off",
            "import/no-namespace": "off",
            "no-shadow": "off",
        },
        env: {
            es6: true,
            "jest/globals": true,
            node: true,
        },
        ignorePatterns: ["jest.config.ts", "lib/"],
        ...config,
    };
}
exports.eslintConfig = eslintConfig;
//# sourceMappingURL=eslint.js.map