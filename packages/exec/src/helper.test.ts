import { expect, test } from "@jest/globals";
import { RunResult } from "./run";

export interface Hook<T> {
  data?: T;
}

export function newHook<T>(): Hook<T> {
  return { data: undefined };
}

interface TestCheckRunResultParams {
  res: Hook<RunResult>;
}

export function testCheckRunResult(params: TestCheckRunResultParams) {
  test("the status should be ok", () => {
    expect(params.res.data!.isOk()).toBe(true);
  });
}
