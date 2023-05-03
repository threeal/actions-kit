import * as core from "@actions/core";
import { describe, expect, jest, test } from "@jest/globals";
import {
  getBooleanInput,
  getMultilineInput,
  getNumberInput,
  getStringInput,
} from "./input";

jest.mock("@actions/core");
const mockedCore = jest.mocked(core, { shallow: true });

mockedCore.getInput.mockImplementation((name) => {
  switch (name) {
    case "empty-key":
      return "";
    case "string-key":
      return "some string";
    case "number-key":
      return "123";
    case "true-key":
      return "true";
    case "false-key":
      return "false";
    default:
      throw new Error(`unknown name: ${name}`);
  }
});

mockedCore.getMultilineInput.mockImplementation((name) => {
  switch (name) {
    case "empty-key":
      return [];
    case "multiline-key":
      return ["some", "list", "of", "string"];
    default:
      throw new Error(`unknown name: ${name}`);
  }
});

describe("gets string from an input", () => {
  test("from a valid input", () => {
    const res = getStringInput("string-key");
    expect(res).not.toHaveLength(0);
  });

  test("from an empty input", () => {
    const res = getStringInput("empty-key");
    expect(res).toBeUndefined();
  });
});

describe("gets multiline string from an input", () => {
  test("from a valid input", () => {
    const res = getMultilineInput("multiline-key");
    expect(res).not.toHaveLength(0);
  });

  test("from an empty input", () => {
    const res = getMultilineInput("empty-key");
    expect(res).toHaveLength(0);
  });
});

describe("gets boolean from an input", () => {
  test("from a true input", () => {
    const res = getBooleanInput("true-key");
    expect(res).toBe(true);
  });

  test("from a false input", () => {
    const res = getBooleanInput("false-key");
    expect(res).toBe(false);
  });

  test("from an invalid input", () => {
    const res = getBooleanInput("string-key");
    expect(res).toBeUndefined();
  });

  test("from an empty input", () => {
    const res = getBooleanInput("empty-key");
    expect(res).toBeUndefined();
  });
});

describe("gets number from an input", () => {
  test("from a valid input", () => {
    const res = getNumberInput("number-key");
    expect(res).not.toBeNaN();
  });

  test("from an invalid input", () => {
    const res = getNumberInput("string-key");
    expect(res).toBeNaN();
  });

  test("from an empty input", () => {
    const res = getNumberInput("empty-key");
    expect(res).toBeUndefined();
  });
});
