import { describe, expect, jest, test } from "@jest/globals";
import { defaultEslintConfig } from "./default";
import { eslintConfig } from "./index";

jest.mock("./default", () => ({
  ...jest.requireActual<object>("./default"),
  defaultEslintConfig: {
    enabled: false,
    options: {
      enabled: false,
    },
  },
}));

describe("ESLint configuration creation", () => {
  test("creates configuration without any arguments", () => {
    const config = eslintConfig();
    expect(config).toStrictEqual(defaultEslintConfig);
  });

  test("creates configuration with an object argument", () => {
    const config = eslintConfig({
      disabled: true,
      options: {
        disabled: true,
      },
    });
    expect(config).toStrictEqual({
      enabled: false,
      disabled: true,
      options: {
        disabled: true,
      },
    });
  });

  test("creates configuration with a function argument", () => {
    const config = eslintConfig((config) => {
      return { ...config, disabled: true };
    });
    expect(config).toStrictEqual({
      enabled: false,
      disabled: true,
      options: {
        enabled: false,
      },
    });
  });
});
