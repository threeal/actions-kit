import { describe, expect, test } from "@jest/globals";
import { error, fatal, warning } from "./log";

describe("writes warning to log", () => {
  test("should not throw", () => {
    expect(() => warning("some message")).not.toThrow();
  });
});

describe("writes error to log", () => {
  test("should not throw", () => {
    expect(() => error("some message")).not.toThrow();
  });
});

describe("writes a fatal message to the log", () => {
  test("should not throws an error", () => {
    expect(() => fatal("some message")).not.toThrow();
  });
});
