import { expect } from "@jest/globals";

export function flushStdout() {
  process.env.TEST_STDOUT = "";
}

export function expectStdout() {
  return expect(process.env.TEST_STDOUT);
}
