import { beforeAll, describe, expect, test } from "@jest/globals";
import { getBooleanInput, getNumberInput, getStringInput } from "./input";

function setInput(name: string, value: string) {
  process.env[`INPUT_${name.replace(/ /g, "_").toUpperCase()}`] = value;
}

describe("gets string from an input", () => {
  describe("from a valid input", () => {
    beforeAll(() => setInput("input", "some string"));
    test("should returns a correct string", () => {
      expect(getStringInput("input")).toBe("some string");
    });
  });

  describe("from an empty input", () => {
    beforeAll(() => setInput("input", ""));
    test("should returns null", () => {
      expect(getStringInput("input")).toBeNull();
    });
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
  describe("from a valid input", () => {
    beforeAll(() => setInput("input", "123"));
    test("should returns a correct number", () => {
      expect(getNumberInput("input")).toBe(123);
    });
  });

  describe("from an invalid input", () => {
    beforeAll(() => setInput("input", "some invalid number"));
    test("should returns NaN", () => {
      expect(getNumberInput("input")).toBeNaN();
    });
  });

  describe("from an empty input", () => {
    beforeAll(() => setInput("input", ""));
    test("should returns null", () => {
      expect(getNumberInput("input")).toBeNull();
    });
  });
});
