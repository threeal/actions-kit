import { describe, expect, test } from "@jest/globals";
import { Command } from "./command";
import { testExecOnSuccessAndFailed } from "./exec-helper.test";

describe("constrcuts a new command", () => {
  let command: Command;
  test("should not throws an error", () => {
    expect(() => {
      command = new Command("node", "--no-addons", "--no-deprecation");
    }).not.toThrow();
  });

  describe("checks the properties", () => {
    test("the command should be equals", () => {
      expect(command.command).toEqual("node");
    });
    test("the arguments should be equal", () => {
      expect(command.args).toEqual(["--no-addons", "--no-deprecation"]);
    });
  });

  testExecOnSuccessAndFailed({
    title: "runs the command",
    shouldBeSilent: false,
    onSuccess: {
      exec: () => command.run("-e", "console.log('some log')"),
      execScript:
        "const command = new exec.Command('node');\n\
        command.run('-e', 'console.log(\"some log\")');",
    },
    onFailed: {
      exec: () => command.run("-e", "throw new Error('some error')"),
      execScript:
        "const command = new exec.Command('node');\n\
        command.run('-e', 'throw new Error(\"some error\")');",
    },
  });

  testExecOnSuccessAndFailed({
    title: "runs the command silently",
    shouldBeSilent: true,
    onSuccess: {
      exec: () => command.runSilently("-e", "console.log('some log')"),
      execScript:
        "const command = new exec.Command('node');\n\
        command.runSilently('-e', 'console.log(\"some log\")');",
    },
    onFailed: {
      exec: () => command.runSilently("-e", "throw new Error('some error')"),
      execScript:
        "const command = new exec.Command('node');\n\
        command.runSilently('-e', 'throw new Error(\"some error\")');",
    },
  });

  testExecOnSuccessAndFailed({
    title: "runs the command and gets the output",
    shouldBeSilent: false,
    onSuccess: {
      exec: () => command.output("-e", "console.log('some log')"),
      expectedOutput: "some log\n",
      execScript:
        "const command = new exec.Command('node');\n\
        command.output('-e', 'console.log(\"some log\")');",
    },
    onFailed: {
      exec: () => command.output("-e", "throw new Error('some error')"),
      execScript:
        "const command = new exec.Command('node');\n\
        command.output('-e', 'throw new Error(\"some error\")');",
    },
  });

  testExecOnSuccessAndFailed({
    title: "runs the command silently and gets the output",
    shouldBeSilent: true,
    onSuccess: {
      exec: () => command.outputSilently("-e", "console.log('some log')"),
      expectedOutput: "some log\n",
      execScript:
        "const command = new exec.Command('node');\n\
        command.outputSilently('-e', 'console.log(\"some log\")');",
    },
    onFailed: {
      exec: () => command.outputSilently("-e", "throw new Error('some error')"),
      execScript:
        "const command = new exec.Command('node');\n\
        command.outputSilently('-e', 'throw new Error(\"some error\")');",
    },
  });
});
