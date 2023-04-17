import * as core from "@actions/core";
import { beforeAll, describe, expect, jest, test } from "@jest/globals";
import { getBooleanInput, getNumberInput, getStringInput } from "./input";

jest.mock("@actions/core");
const mockedCore = jest.mocked(core, { shallow: true });

function setInput(name: string, value: string) {
  process.env[`INPUT_${name.replace(/ /g, "_").toUpperCase()}`] = value;
}

describe("gets string from an input", () => {
  test("from a valid input", () => {
    mockedCore.getInput.mockReturnValue("some string");
    expect(getStringInput("string-key")).toBe("some string");
    expect(mockedCore.getInput.mock.lastCall?.[0]).toBe("string-key");
  });

  test("from an empty input", () => {
    mockedCore.getInput.mockReturnValue("");
    expect(getStringInput("empty-key")).toBeNull();
    expect(mockedCore.getInput.mock.lastCall?.[0]).toBe("empty-key");
  });
});

describe("gets boolean from an input", () => {
  describe("from a valid input", () => {
    beforeAll(() => setInput("input", "true"));
    describe("with a true value", () => {
      test("should returns true", () => {
        expect(getBooleanInput("input")).toBe(true);
      });
    });
    describe("with a false value", () => {
      beforeAll(() => setInput("input", "false"));
      test("should returns false", () => {
        expect(getBooleanInput("input")).toBe(false);
      });
    });
  });

  describe("from an invalid input", () => {
    beforeAll(() => setInput("input", "some invalid boolean"));
    test("should throws an error", () => {
      expect(() => getBooleanInput("input")).toThrow();
    });
  });

  describe("from an empty input", () => {
    beforeAll(() => setInput("input", ""));
    test("should throws an error", () => {
      expect(() => getBooleanInput("input")).toThrow();
    });
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
