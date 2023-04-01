import { beforeAll, describe, expect, test } from "@jest/globals";
import { OutputResult, outputSilently } from "./output";
import { RunResult } from "./run";

export interface Hook<T> {
  data?: T;
}

export function newHook<T>(): Hook<T> {
  return { data: undefined };
}

interface TestOutputSilentParams {
  script: string;
  shouldBeSilent: boolean;
}

export function testOutputSilent(params: TestOutputSilentParams) {
  describe("runs in a separate process", () => {
    let prom: Promise<OutputResult>;
    test("should be resolved", () => {
      const importScript = "const exec = require('./packages/exec/lib');\n";
      prom = outputSilently("node", "-e", importScript + params.script);
      return expect(prom).resolves.toBeTruthy();
    });
    describe("checks the output", () => {
      let res: OutputResult;
      beforeAll(async () => (res = await prom));
      if (params.shouldBeSilent) {
        test("the output should be empty", () => {
          expect(res.output.length).toBe(0);
        });
      } else {
        test("the output should not be empty", () => {
          expect(res.output.length).toBeGreaterThan(0);
        });
      }
    });
  });
}

interface TestCheckRunResultParams {
  res: Hook<RunResult>;
  shouldBeOk: boolean;
}

export function testCheckRunResult(params: TestCheckRunResultParams) {
  if (params.shouldBeOk) {
    test("the status should be ok", () => {
      expect(params.res.data!.isOk()).toBe(true);
    });
  } else {
    test("the status should not be ok", () => {
      expect(params.res.data!.isOk()).toBe(false);
    });
  }
}
