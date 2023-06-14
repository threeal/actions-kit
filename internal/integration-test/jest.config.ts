import { createJestConfig } from "@actions-kit/dev";

export default createJestConfig((config) => {
  config.collectCoverage = false;
  config.testMatch?.push("!**/helper.test.ts");
  return config;
});
