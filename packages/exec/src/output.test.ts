import { beforeAll, describe, expect, test } from "@jest/globals";
import { newHook, testCheckRunResult, testOutputSilent } from "./helper.test";
import { output, OutputResult, outputSilently } from "./output";

test("constructs a new command run and output get result", () => {
  const res = new OutputResult(0, "some message");
  expect(res.code).toBe(0);
  expect(res.output).toBe("some message");
});

describe("runs a command and gets the output", () => {
  const runs = new Map([
    ["runs verbosely", false],
    ["runs silently", true],
  ]);
  for (const [title, isSilent] of runs) {
    describe(title, () => {
      const commands = new Map([
        ["on a successful command", true],
        ["on a failed command", false],
      ]);
      for (const [title, isSuccessful] of commands) {
        describe(title, () => {
          let prom: Promise<OutputResult>;
          test("should be resolved", () => {
            const script = isSuccessful
              ? "console.log('some log')"
              : "throw new Error('some error')";
            prom = isSilent
              ? outputSilently("node", "-e", script)
              : output("node", "-e", script);
            return expect(prom).resolves.toBeTruthy();
          });
          describe("checks the result", () => {
            const res = newHook<OutputResult>();
            beforeAll(async () => (res.data = await prom));
            testCheckRunResult({ res, shouldBeOk: isSuccessful });
            if (isSuccessful) {
              test("the output should be correct", () => {
                expect(res.data!.output).toBe("some log\n");
              });
            }
          });
        });
      }
      const script = isSilent
        ? `exec.outputSilently('node', '-e', 'console.log("some log")');`
        : `exec.output('node', '-e', 'console.log("some log")');`;
      testOutputSilent({ script, shouldBeSilent: isSilent });
    });
  }
});
