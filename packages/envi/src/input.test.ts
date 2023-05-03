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
    const expected = ["some", "list", "of", "string"];
    mockedCore.getMultilineInput.mockReturnValue(expected);
    expect(getMultilineInput("multiline-key")).toBe(expected);
    expect(mockedCore.getMultilineInput.mock.lastCall?.[0]).toBe(
      "multiline-key"
    );
  });

  test("from an empty input", () => {
    mockedCore.getMultilineInput.mockReturnValue([]);
    expect(getMultilineInput("empty-multiline-key")).toHaveLength(0);
    expect(mockedCore.getMultilineInput.mock.lastCall?.[0]).toBe(
      "empty-multiline-key"
    );
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
