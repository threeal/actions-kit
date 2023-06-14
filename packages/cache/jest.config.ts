import { createJestConfig } from "@actions-kit/dev";

export default createJestConfig((config) => {
  config.testMatch?.push("!**/helper.test.ts");
  config.coveragePathIgnorePatterns?.push(".test.ts");
  return config;
});
