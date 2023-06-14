import { createJestConfig } from "@actions-kit/dev";

export default createJestConfig({
  testMatch: ["**/*.test.ts", "!**/*helper.test.ts"],
});
