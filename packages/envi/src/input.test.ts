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

describe("gets string from an input", () => {
  test("from a valid input", () => {
    mockedCore.getInput.mockReturnValue("some string");
    expect(getStringInput("string-key")).toBe("some string");
    expect(mockedCore.getInput.mock.lastCall?.[0]).toBe("string-key");
  });

  test("from an empty input", () => {
    mockedCore.getInput.mockReturnValue("");
    expect(getStringInput("empty-key")).toBeUndefined();
    expect(mockedCore.getInput.mock.lastCall?.[0]).toBe("empty-key");
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
    mockedCore.getInput.mockReturnValue("true");
    expect(getBooleanInput("true-key")).toBe(true);
    expect(mockedCore.getInput.mock.lastCall?.[0]).toBe("true-key");
  });

  test("from a false input", () => {
    mockedCore.getInput.mockReturnValue("false");
    expect(getBooleanInput("false-key")).toBe(false);
    expect(mockedCore.getInput.mock.lastCall?.[0]).toBe("false-key");
  });

  test("from an invalid input", () => {
    mockedCore.getInput.mockReturnValue("some invalid boolean");
    expect(getBooleanInput("invalid-boolean-key")).toBeUndefined();
    expect(mockedCore.getInput.mock.lastCall?.[0]).toBe("invalid-boolean-key");
  });

  test("from an empty input", () => {
    mockedCore.getInput.mockReturnValue("");
    expect(getBooleanInput("empty-key")).toBeUndefined();
    expect(mockedCore.getInput.mock.lastCall?.[0]).toBe("empty-key");
  });
});

describe("gets number from an input", () => {
  test("from a valid input", () => {
    mockedCore.getInput.mockReturnValue("123");
    expect(getNumberInput("number-key")).toBe(123);
    expect(mockedCore.getInput.mock.lastCall?.[0]).toBe("number-key");
  });

  test("from an invalid input", () => {
    mockedCore.getInput.mockReturnValue("some invalid number");
    expect(getNumberInput("invalid-number-key")).toBeNaN();
    expect(mockedCore.getInput.mock.lastCall?.[0]).toBe("invalid-number-key");
  });

  test("from an empty input", () => {
    mockedCore.getInput.mockReturnValue("");
    expect(getNumberInput("empty-key")).toBeUndefined();
    expect(mockedCore.getInput.mock.lastCall?.[0]).toBe("empty-key");
  });
});
