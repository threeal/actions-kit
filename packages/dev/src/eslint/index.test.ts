import { beforeEach, describe, expect, jest, test } from "@jest/globals";
import { defaultEslintConfig } from "./default";
import { createEslintConfig } from "./index";

const fileMap = new Map<string, any>();

jest.mock("jsonfile", () => ({
  ...jest.requireActual<object>("jsonfile"),
  writeFileSync: (file: string, obj: any) => fileMap.set(file, obj),
}));

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
  beforeEach(() => fileMap.clear());

  test("creates configuration without any arguments", () => {
    const config = createEslintConfig();
    expect(config).toStrictEqual(defaultEslintConfig);
    expect(fileMap.get("tsconfig.eslint.json")).not.toBeUndefined();
  });

  test("creates configuration with an object argument", () => {
    const config = createEslintConfig({
      disabled: true,
      options: {
        disabled: true,
      },
    });
    expect(config).toStrictEqual({
      enabled: false,
      disabled: true,
      options: {
        enabled: false,
        disabled: true,
      },
    });
    expect(fileMap.get("tsconfig.eslint.json")).not.toBeUndefined();
  });

  test("creates configuration with a function argument", () => {
    const config = createEslintConfig((config) => {
      return { ...config, disabled: true };
    });
    expect(config).toStrictEqual({
      enabled: false,
      disabled: true,
      options: {
        enabled: false,
      },
    });
    expect(fileMap.get("tsconfig.eslint.json")).not.toBeUndefined();
  });
});
