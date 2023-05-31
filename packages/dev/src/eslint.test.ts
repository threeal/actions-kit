import { describe, expect, test } from "@jest/globals";
import { defaultEslintConfig, eslintConfig } from "./eslint";

describe("ESLint configuration creation", () => {
  test("creates configuration without any arguments", () => {
    const config = eslintConfig();
    expect(config).toStrictEqual(defaultEslintConfig);
  });

  test("creates configuration with an object argument", () => {
    const customConfig = {
      rules: { "no-unused-var": "off" },
      ignorePatterns: ["jest.config.ts", "lib/", "node_modules/"],
    };
    const config = eslintConfig(customConfig);
    const expectedConfig: object = {
      ...defaultEslintConfig,
      ...customConfig,
    };
    expect(config).toStrictEqual(expectedConfig);
  });
});
