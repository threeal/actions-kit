import { beforeAll, describe, expect, test } from "@jest/globals";
import { OutputResult, RunResult } from "./result";
import { outputSilently } from "./output";

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
  describe("runs in a separate process", () => {
    let resProm: Promise<OutputResult>;
    test("should be resolved", () => {
      const importScript = "const exec = require('./packages/exec/lib');\n";
      resProm = outputSilently("node", "-e", importScript + params.runScript);
      return expect(resProm).resolves.toBeTruthy();
    });
    describe("checks the output", () => {
      let res: OutputResult;
      beforeAll(async () => (res = await resProm));
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
