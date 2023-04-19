import * as core from "@actions/core";
import { describe, expect, jest, test } from "@jest/globals";
import { getBooleanInput, getNumberInput, getStringInput } from "./input";

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

describe("gets boolean from an input", () => {
  test("from a true input", () => {
    mockedCore.getBooleanInput.mockReturnValue(true);
    expect(getBooleanInput("true-key")).toBe(true);
    expect(mockedCore.getBooleanInput.mock.lastCall?.[0]).toBe("true-key");
  });

  test("from a false input", () => {
    mockedCore.getBooleanInput.mockReturnValue(false);
    expect(getBooleanInput("false-key")).toBe(false);
    expect(mockedCore.getBooleanInput.mock.lastCall?.[0]).toBe("false-key");
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
    expect(getNumberInput("empty-key")).toBeNull();
    expect(mockedCore.getInput.mock.lastCall?.[0]).toBe("empty-key");
  });
});
