import { beforeAll, describe, expect, test } from "@jest/globals";
import { getNumberInput, getStringInput } from "./input";

function setInput(name: string, value: string) {
  process.env[`INPUT_${name.replace(/ /g, "_").toUpperCase()}`] = value;
}

describe("test get string from inputs", () => {
  describe("from an input", () => {
    let val: string | null;
    beforeAll(() => {
      setInput("input", "some string");
      val = getStringInput("input");
    });
    test("should be equal", () => {
      expect(val).toBe("some string");
    });
  });

  describe("from an empty input", () => {
    let val: string | null;
    beforeAll(() => {
      setInput("input", "");
      val = getStringInput("input");
    });
    test("should be null", () => {
      expect(val).toBeNull();
    });
  });
});

describe("test get number from inputs", () => {
  describe("from an input", () => {
    let val: number | null;
    beforeAll(() => {
      setInput("input", "123");
      val = getNumberInput("input");
    });
    test("should be equal", () => {
      expect(val).toBe(123);
    });
  });

  describe("from an invalid input", () => {
    let val: number | null;
    beforeAll(() => {
      setInput("input", "some invalid number");
      val = getNumberInput("input");
    });
    test("should be NaN", () => {
      expect(val).toBeNaN();
    });
  });

  describe("from an empty input", () => {
    let val: number | null;
    beforeAll(() => {
      setInput("input", "");
      val = getNumberInput("input");
    });
    test("should be null", () => {
      expect(val).toBeNull();
    });
  });
});
