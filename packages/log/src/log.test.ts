import { beforeAll, describe, expect, test } from "@jest/globals";
import { error, warning } from "./log";
import { flushStdout, stdout } from "./internal/stdout.test";

describe("test writes warning to log", () => {
  beforeAll(() => {
    flushStdout();
    warning("some message");
  });
  test("message should be written", () => {
    expect(stdout()).toMatch(/some message/);
  });
  test("warning label should be written", () => {
    expect(stdout()).toMatch(/warning/i);
  });
});

describe("test writes error to log", () => {
  beforeAll(() => {
    flushStdout();
    error("some message");
  });
  test("message should be written", () => {
    expect(stdout()).toMatch(/some message/);
  });
  test("error label should be written", () => {
    expect(stdout()).toMatch(/error/i);
  });
});
