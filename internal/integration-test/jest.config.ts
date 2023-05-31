import { createJestConfig } from "@actions-kit/dev";

export default createJestConfig({
  collectCoverage: false,
  testMatch: ["**/*.test.ts", "!**/helper.test.ts"],
});
