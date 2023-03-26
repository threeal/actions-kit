import { beforeAll, describe, expect, test } from "@jest/globals";
import { execOut } from "./exec";
import { Result } from "./result";

interface TestExecParams {
  exec: () => Promise<Result>;
  expectedOutput?: string;
  execScript: string;
}

function testExec(
  shouldBeOk: boolean,
  shouldBeSilent: boolean,
  params: TestExecParams
) {
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
  describe("runs in a separate process", () => {
    test("should be resolved", () => {
      const importScript = "const exec = require('./packages/exec/lib');\n";
      prom = execOut("node", "-e", importScript + params.execScript);
      return expect(prom).resolves.toBeTruthy();
    });
    describe("checks the output", () => {
      let res: Result;
      beforeAll(async () => (res = await prom));
      if (shouldBeSilent) {
        test("output should be empty", () => {
          expect(res.output.length).toBe(0);
        });
      } else {
        test("output should not be empty", () => {
          expect(res.output.length).toBeGreaterThan(0);
        });
      }
    });
  });
}

export interface TestExecOnSuccessAndFailedParams {
  title: string;
  shouldBeSilent: boolean;
  onSuccess: TestExecParams;
  onFailed: TestExecParams;
}

export function testExecOnSuccessAndFailed(
  params: TestExecOnSuccessAndFailedParams
) {
  describe(params.title, () => {
    describe("on a successful command", () => {
      testExec(true, params.shouldBeSilent, params.onSuccess);
    });
    describe("on a failed command", () => {
      testExec(false, params.shouldBeSilent, params.onFailed);
    });
  });
}
