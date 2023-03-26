import { beforeAll, describe, expect, test } from "@jest/globals";
import { outputSilently } from "./exec";
import { Result } from "./result";

interface TestRunParams {
  run: () => Promise<Result>;
  expectedOutput?: string;
  runScript: string;
}

function testRun(
  shouldBeOk: boolean,
  shouldBeSilent: boolean,
  params: TestRunParams
) {
  let prom: Promise<Result>;
  test("should be resolved", () => {
    prom = params.run();
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
      prom = outputSilently("node", "-e", importScript + params.runScript);
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

export interface TestRunOnSuccessAndFailedParams {
  title: string;
  shouldBeSilent: boolean;
  onSuccess: TestRunParams;
  onFailed: TestRunParams;
}

export function testRunOnSuccessAndFailed(
  params: TestRunOnSuccessAndFailedParams
) {
  describe(params.title, () => {
    describe("on a successful command", () => {
      testRun(true, params.shouldBeSilent, params.onSuccess);
    });
    describe("on a failed command", () => {
      testRun(false, params.shouldBeSilent, params.onFailed);
    });
  });
}
