import { describe, expect, test } from "@jest/globals";
import { createJestConfig, defaultJestConfig, JestConfig } from "./jest";

describe("Jest configuration creation", () => {
  test("creates configuration without any arguments", () => {
    const config = createJestConfig();
    expect(config).toStrictEqual(defaultJestConfig);
  });

  test("creates configuration with an object argument", () => {
    const customConfig = {
      collectCoverage: false,
      testMatch: ["**/*.test.ts", "!**/*helper.test.ts"],
    };
    const config = createJestConfig(customConfig);
    const expectedConfig: JestConfig = {
      ...defaultJestConfig,
      ...customConfig,
    };
    expect(config).toStrictEqual(expectedConfig);
  });

  test("creates configuration with a function argument", () => {
    const alterConfig = (config: JestConfig): JestConfig => {
      config.collectCoverage = false;
      return config;
    };
    const config = createJestConfig(alterConfig);
    const expectedConfig: JestConfig = {
      ...defaultJestConfig,
      collectCoverage: false,
    };
    expect(config).toStrictEqual(expectedConfig);
  });
});
