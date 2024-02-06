import { describe, expect, jest, test } from "@jest/globals";
import { defaultJestConfig } from "./default";
import { createJestConfig } from "./index";

jest.mock("./default", () => ({
  ...jest.requireActual<object>("./default"),
  defaultJestConfig: {
    clearMocks: false,
    coverageThreshold: {
      global: {
        branches: 100,
      },
    },
  },
}));

describe("Jest configuration creation", () => {
  test("creates configuration without any arguments", () => {
    const config = createJestConfig();
    expect(config).toStrictEqual(defaultJestConfig);
  });

  test("creates configuration with an object argument", () => {
    const config = createJestConfig({
      collectCoverage: false,
      coverageThreshold: {
        global: {
          functions: 100,
        },
      },
    });
    expect(config).toStrictEqual({
      clearMocks: false,
      collectCoverage: false,
      coverageThreshold: {
        global: {
          branches: 100,
          functions: 100,
        },
      },
    });
  });

  test("creates configuration with a function argument", () => {
    const config = createJestConfig((config) => {
      config.collectCoverage = false;
      return config;
    });
    expect(config).toStrictEqual({
      clearMocks: false,
      collectCoverage: false,
      coverageThreshold: {
        global: {
          branches: 100,
        },
      },
    });
  });
});
