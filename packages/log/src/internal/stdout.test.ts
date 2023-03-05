import { beforeAll, describe, expect, test } from "@jest/globals";

export function stdout(): string {
  return process.env.TEST_STDOUT || "";
}

export function flushStdout() {
  process.env.TEST_STDOUT = "";
}

describe("test flush stdout", () => {
  beforeAll(() => flushStdout());
  test("stdout should be empty", () => {
    expect(stdout()).toHaveLength(0);
  });
});
