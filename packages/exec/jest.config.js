const config = require("@actions-kit/dev-jest");
config.testMatch = ["**/*.test.ts", "!**/*helper.test.ts"];
module.exports = config;
