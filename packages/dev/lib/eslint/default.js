"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultEslintConfig = void 0;
/** The default configuration for ESLint. */
exports.defaultEslintConfig = {
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
        "prettier/prettier": "off",
    },
    env: {
        es6: true,
        "jest/globals": true,
        node: true,
    },
    ignorePatterns: ["jest.config.ts", "lib/"],
};
//# sourceMappingURL=default.js.map