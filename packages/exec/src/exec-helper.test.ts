import { beforeAll, describe, expect, test } from "@jest/globals";
import { Result } from "./result";

interface TestExecParams {
  exec: () => Promise<Result>;
  expectedOutput?: string;
}

function testExec(shouldBeOk: boolean, params: TestExecParams) {
  let prom: Promise<Result>;
  test("should be resolved", () => {
    prom = params.exec();
    return expect(prom).resolves.toBeTruthy();
  });
  describe("checks the result", () => {
    let res: Result;
    beforeAll(async () => (res = await prom));
    if (shouldBeOk) {
      test("the status should be ok", () => {
        expect(res.isOk()).toBe(true);
      });
      if (params.expectedOutput) {
        test("the output should be correct", () => {
          expect(res.output).toBe(params.expectedOutput);
        });
      }
    } else {
      test("the status should not be ok", () => {
        expect(res.isOk()).not.toBe(true);
      });
    }
  });
}

export interface TestExecOnSuccessAndFailedParams {
  title: string;
  onSuccess: TestExecParams;
  onFailed: TestExecParams;
}

export function testExecOnSuccessAndFailed(
  params: TestExecOnSuccessAndFailedParams
) {
  describe(params.title, () => {
    describe("on a successful command", () => {
      testExec(true, params.onSuccess);
    });
    describe("on a failed command", () => {
      testExec(false, params.onFailed);
    });
  });
}
