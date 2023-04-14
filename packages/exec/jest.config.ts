import config from "@actions-kit/dev-jest";

config.testMatch = ["**/*.test.ts", "!**/*helper.test.ts"];

export default config;
