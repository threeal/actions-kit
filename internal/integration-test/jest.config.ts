import { jestConfig } from "@actions-kit/dev";

export default jestConfig({
  collectCoverage: false,
  testMatch: ["**/*.test.ts", "!**/helper.test.ts"],
});
