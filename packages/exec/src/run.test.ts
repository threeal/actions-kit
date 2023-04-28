import { beforeAll, describe, expect, test } from "@jest/globals";
import { newHook, testCheckRunResult, testOutputSilent } from "./helper.test";
import { run, RunResult, runSilently } from "./run";

describe("constructs a new command run result", () => {
  test("with a zero status code", () => {
    const res = new RunResult(0);
    expect(res.code).toBe(0);
    expect(res.isOk()).toBe(true);
  });

  test("with a non zero status code", () => {
    const res = new RunResult(8);
    expect(res.code).toBe(8);
    expect(res.isOk()).toBe(false);
  });
});

describe("runs a command", () => {
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
          let prom: Promise<RunResult>;
          test("should be resolved", () => {
            const script = isSuccessful
              ? "console.log('some log')"
              : "throw new Error('some error')";
            prom = isSilent
              ? runSilently("node", "-e", script)
              : run("node", "-e", script);
            return expect(prom).resolves.toBeTruthy();
          });
          describe("checks the result", () => {
            const res = newHook<RunResult>();
            beforeAll(async () => (res.data = await prom));
            testCheckRunResult({ res, shouldBeOk: isSuccessful });
          });
        });
      }
      const script = isSilent
        ? `exec.runSilently('node', '-e', 'console.log("some log")');`
        : `exec.run('node', '-e', 'console.log("some log")');`;
      testOutputSilent({ script, shouldBeSilent: isSilent });
    });
  }
});
