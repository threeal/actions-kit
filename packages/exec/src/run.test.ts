import { describe, expect, test } from "@jest/globals";
import { testRunOnSuccessAndFailed } from "./run-helper.test";
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

testRunOnSuccessAndFailed({
  title: "runs a command",
  shouldBeSilent: false,
  onSuccess: {
    run: () => run("node", "-e", "console.log('some log')"),
    runScript: "exec.run('node', '-e', 'console.log(\"some log\")');",
  },
  onFailed: {
    run: () => run("node", "-e", "throw new Error('some error')"),
    runScript: "exec.run('node', '-e', 'throw new Error(\"some error\")');",
  },
});

testRunOnSuccessAndFailed({
  title: "runs a command silently",
  shouldBeSilent: true,
  onSuccess: {
    run: () => runSilently("node", "-e", "console.log('some log')"),
    runScript: "exec.runSilently('node', '-e', 'console.log(\"some log\")');",
  },
  onFailed: {
    run: () => runSilently("node", "-e", "throw new Error('some error')"),
    runScript:
      "exec.runSilently('node', '-e', 'throw new Error(\"some error\")');",
  },
});
