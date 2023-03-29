import { describe, expect, test } from "@jest/globals";
import { OutputResult } from "./output";

describe("constructs a new result object", () => {
  describe("without anything specified", () => {
    let res: OutputResult;
    test("should not throws an error", () => {
      expect(() => (res = new OutputResult(0, ""))).not.toThrow();
    });
    describe("checks the properties", () => {
      test("the status code should be defaulted to zero", () => {
        expect(res.code).toBe(0);
      });
      test("the log output should be empty", () => {
        expect(res.output).toHaveLength(0);
      });
      test("the status should be ok", () => {
        expect(res.isOk()).toBe(true);
      });
    });
  });

  describe("with a status code specified", () => {
    describe("with a zero status code", () => {
      let res: OutputResult;
      test("should not throws an error", () => {
        expect(() => (res = new OutputResult(0, ""))).not.toThrow();
      });
      describe("checks the properties", () => {
        test("the status code should be equals", () => {
          expect(res.code).toBe(0);
        });
        test("the log output should be empty", () => {
          expect(res.output).toHaveLength(0);
        });
        test("the status should be ok", () => {
          expect(res.isOk()).toBe(true);
        });
      });
    });

    describe("with a non zero status code", () => {
      let res: OutputResult;
      test("should not throws an error", () => {
        expect(() => (res = new OutputResult(8, ""))).not.toThrow();
      });
      describe("checks the properties", () => {
        test("the status code should be equals", () => {
          expect(res.code).toBe(8);
        });
        test("the log output should be empty", () => {
          expect(res.output).toHaveLength(0);
        });
        test("the status should not be ok", () => {
          expect(res.isOk()).toBe(false);
        });
      });
    });
  });
});
