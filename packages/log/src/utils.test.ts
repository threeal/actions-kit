import { beforeAll, describe, expect, test } from "@jest/globals";

export function flushStdout() {
  process.env.TEST_STDOUT = "";
}

export function expectStdout() {
  return expect(process.env.TEST_STDOUT);
}

describe("test flush stdout", () => {
  beforeAll(() => flushStdout());
  test("stdout should be empty", () => {
    expectStdout().toHaveLength(0);
  });
});
