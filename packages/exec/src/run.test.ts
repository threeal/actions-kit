import { beforeAll, describe, expect, test } from "@jest/globals";
import { testOutputSilent } from "./helper.test";
import { run, RunResult, runSilently } from "./run";

describe("constructs a new command run result", () => {
  describe("with a zero status code", () => {
    let res: RunResult;
    test("should not throws an error", () => {
      expect(() => (res = new RunResult(0))).not.toThrow();
    });
    describe("checks the properties", () => {
      test("the status code should be equals", () => {
        expect(res.code).toBe(0);
      });
      test("the status should be ok", () => {
        expect(res.isOk()).toBe(true);
      });
    });
  });

  describe("with a non zero status code", () => {
    let res: RunResult;
    test("should not throws an error", () => {
      expect(() => (res = new RunResult(8))).not.toThrow();
    });
    describe("checks the properties", () => {
      test("the status code should be equals", () => {
        expect(res.code).toBe(8);
      });
      test("the status should not be ok", () => {
        expect(res.isOk()).toBe(false);
      });
    });
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
            let res: RunResult;
            beforeAll(async () => (res = await prom));
            if (isSuccessful) {
              test("the status should be ok", () => {
                expect(res.isOk()).toBe(true);
              });
            } else {
              test("the status should not be ok", () => {
                expect(res.isOk()).toBe(false);
              });
            }
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
