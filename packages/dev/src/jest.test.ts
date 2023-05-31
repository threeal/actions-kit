import { describe, expect, test } from "@jest/globals";
import { defaultJestConfig, jestConfig } from "./jest";

describe("Jest configuration creation", () => {
  test("creates configuration without any arguments", () => {
    const config = jestConfig();
    expect(config).toStrictEqual(defaultJestConfig);
  });

  test("creates configuration with an object argument", () => {
    const customConfig = {
      collectCoverage: false,
      testMatch: ["**/*.test.ts", "!**/*helper.test.ts"],
    };
    const config = jestConfig(customConfig);
    const expectedConfig = { ...defaultJestConfig, ...customConfig };
    expect(config).toStrictEqual(expectedConfig);
  });
});
