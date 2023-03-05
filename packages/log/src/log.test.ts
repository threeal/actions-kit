import { beforeAll, describe, test } from "@jest/globals";
import { error, info, warning } from "./log";
import { expectStdout, flushStdout } from "./utils.test";

describe("test writes warning to log", () => {
  beforeAll(() => {
    flushStdout();
    warning("some message");
  });
  test("message should be written", () => {
    expectStdout().toMatch(/some message/);
  });
  test("warning label should be written", () => {
    expectStdout().toMatch(/warning/i);
  });
});

describe("test writes error to log", () => {
  beforeAll(() => {
    flushStdout();
    error("some message");
  });
  test("message should be written", () => {
    expectStdout().toMatch(/some message/);
  });
  test("error label should be written", () => {
    expectStdout().toMatch(/error/i);
  });
});
