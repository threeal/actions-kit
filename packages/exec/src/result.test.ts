import { describe, expect, test } from "@jest/globals";
import { Result } from "./result";

describe("constructs a new result object", () => {
  describe("without anything specified", () => {
    let res: Result;
    test("should not throws an error", () => {
      expect(() => (res = new Result(0))).not.toThrow();
    });
    test("the status code should be defaulted to 0", () => {
      expect(res.code).toBe(0);
    });
    test("the status should be ok", () => {
      expect(res.isOk()).toBe(true);
    });
  });

  describe("with a status code specified", () => {
    let res: Result;
    test("should not throws an error", () => {
      expect(() => (res = new Result(8))).not.toThrow();
    });
    test("the status code should be equals", () => {
      expect(res.code).toBe(8);
    });
    test("the status should not be ok", () => {
      expect(res.isOk()).toBe(false);
    });
  });
});
