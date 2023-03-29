import { beforeAll, describe, expect, test } from "@jest/globals";
import { testOutputSilent } from "./helper.test";
import { OutputResult } from "./output";
import { RunResult } from "./run";

interface TestRunParams {
  run: (() => Promise<RunResult>) | (() => Promise<OutputResult>);
  expectedOutput?: string;
  runScript: string;
}

function testRun(
  shouldBeOk: boolean,
  shouldBeSilent: boolean,
  params: TestRunParams
) {
  let prom: Promise<RunResult> | Promise<OutputResult>;
  test("should be resolved", () => {
    prom = params.run();
    return expect(prom).resolves.toBeTruthy();
  });
  describe("checks the result", () => {
    let res: RunResult | OutputResult;
    beforeAll(async () => (res = await prom));
    if (shouldBeOk) {
      test("the status should be ok", () => {
        expect(res.isOk()).toBe(true);
      });
      if (params.expectedOutput) {
        test("the output should be correct", () => {
          const output = (res as OutputResult).output;
          expect(output).toBe(params.expectedOutput);
        });
      }
    } else {
      test("the status should not be ok", () => {
        expect(res.isOk()).not.toBe(true);
      });
    }
  });
  testOutputSilent(params.runScript, shouldBeSilent);
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
