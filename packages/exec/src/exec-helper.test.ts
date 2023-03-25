import { beforeAll, describe, expect, test } from "@jest/globals";
import { Result } from "./result";

interface TestExecParams {
  exec: () => Promise<Result>;
  shouldBeOk: boolean;
}

function testExec(params: TestExecParams) {
  let prom: Promise<Result>;
  test("should be resolved", () => {
    prom = params.exec();
    return expect(prom).resolves.toBeTruthy();
  });
  describe("checks the result", () => {
    let res: Result;
    beforeAll(async () => (res = await prom));
    if (params.shouldBeOk) {
      test("the status should be ok", () => {
        expect(res.isOk()).toBe(true);
      });
    } else {
      test("the status should not be ok", () => {
        expect(res.isOk()).not.toBe(true);
      });
    }
  });
}

export interface TestExecOnSuccessAndFailParams {
  title: string;
  successExec: () => Promise<Result>;
  failExec: () => Promise<Result>;
}

export function testExecOnSuccessAndFail(
  params: TestExecOnSuccessAndFailParams
) {
  describe(params.title, () => {
    describe("on a successful command", () => {
      testExec({ exec: params.successExec, shouldBeOk: true });
    });
    describe("on a failed command", () => {
      testExec({ exec: params.failExec, shouldBeOk: false });
    });
  });
}
