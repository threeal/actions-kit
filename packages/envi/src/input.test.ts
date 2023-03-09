import { beforeAll, describe, expect, test } from "@jest/globals";
import { getStringInput } from "./input";

function setInput(name: string, value: string) {
  process.env[`INPUT_${name.replace(/ /g, "_").toUpperCase()}`] = value;
}

describe("test get string inputs", () => {
  describe("get a string input", () => {
    let val: string | null;
    beforeAll(() => {
      setInput("input", "some string");
      val = getStringInput("input");
    });
    test("should be equal", () => {
      expect(val).toBe("some string");
    });
  });

  describe("get an empty input", () => {
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
