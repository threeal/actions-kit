import { beforeAll, describe, expect, test } from "@jest/globals";
import { error, info, warning } from "./log";

function expectStdout() {
  return expect(process.env.TEST_STDOUT);
}

describe("test writes info to log", () => {
  beforeAll(() => info("some message"));
  test("message should be written", () => {
    expectStdout().toBe("some message");
  });
});

describe("test writes warning to log", () => {
  beforeAll(() => warning("some message"));
  test("message should be written", () => {
    expectStdout().toMatch(/some message/);
  });
  test("warning label should be written", () => {
    expectStdout().toMatch(/warning/i);
  });
});

describe("test writes error to log", () => {
  beforeAll(() => error("some message"));
  test("message should be written", () => {
    expectStdout().toMatch(/some message/);
  });
  test("error label should be written", () => {
    expectStdout().toMatch(/error/i);
  });
});
