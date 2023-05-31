import { Config } from "jest";
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
    const expectedConfig: Config = { ...defaultJestConfig, ...customConfig };
    expect(config).toStrictEqual(expectedConfig);
  });

  test("creates configuration with a function argument", () => {
    const alterConfig = (config: Config): Config => {
      config.collectCoverage = false;
      return config;
    };
    const config = jestConfig(alterConfig);
    const expectedConfig: Config = {
      ...defaultJestConfig,
      collectCoverage: false,
    };
    expect(config).toStrictEqual(expectedConfig);
  });
});
