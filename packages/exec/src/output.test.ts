import { describe, expect, test } from "@jest/globals";
import { output, OutputResult, outputSilently } from "./output";
import { testRunOnSuccessAndFailed } from "./run-helper.test";

describe("constructs a new command run and output get result", () => {
  let res: OutputResult;
  test("should not throws an error", () => {
    expect(() => (res = new OutputResult(0, "some message"))).not.toThrow();
  });
  describe("checks the properties", () => {
    test("the log output should be equals", () => {
      expect(res.output).toBe("some message");
    });
  });
});

testRunOnSuccessAndFailed({
  title: "runs a command and gets the output",
  shouldBeSilent: false,
  onSuccess: {
    run: () => output("node", "-e", "console.log('some log')"),
    expectedOutput: "some log\n",
    runScript: "exec.output('node', '-e', 'console.log(\"some log\")');",
  },
  onFailed: {
    run: () => output("node", "-e", "throw new Error('some error')"),
    runScript: "exec.output('node', '-e', 'throw new Error(\"some error\")');",
  },
});

testRunOnSuccessAndFailed({
  title: "runs a command silently and gets the output",
  shouldBeSilent: true,
  onSuccess: {
    run: () => outputSilently("node", "-e", "console.log('some log')"),
    expectedOutput: "some log\n",
    runScript:
      "exec.outputSilently('node', '-e', 'console.log(\"some log\")');",
  },
  onFailed: {
    run: () => outputSilently("node", "-e", "throw new Error('some error')"),
    runScript:
      "exec.outputSilently('node', '-e', 'throw new Error(\"some error\")');",
  },
});
