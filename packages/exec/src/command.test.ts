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
    title: "executes the command",
    shouldBeSilent: false,
    onSuccess: {
      exec: () => command.exec("-e", "console.log('some log')"),
      execScript:
        "const command = new exec.Command('node');\n\
        command.exec('-e', 'console.log(\"some log\")');",
    },
    onFailed: {
      exec: () => command.exec("-e", "throw new Error('some error')"),
      execScript:
        "const command = new exec.Command('node');\n\
        command.exec('-e', 'throw new Error(\"some error\")');",
    },
  });

  testExecOnSuccessAndFailed({
    title: "executes the command silently",
    shouldBeSilent: true,
    onSuccess: {
      exec: () => command.execSilently("-e", "console.log('some log')"),
      execScript:
        "const command = new exec.Command('node');\n\
        command.execSilently('-e', 'console.log(\"some log\")');",
    },
    onFailed: {
      exec: () => command.execSilently("-e", "throw new Error('some error')"),
      execScript:
        "const command = new exec.Command('node');\n\
        command.execSilently('-e', 'throw new Error(\"some error\")');",
    },
  });

  testExecOnSuccessAndFailed({
    title: "executes the command and gets the output",
    shouldBeSilent: false,
    onSuccess: {
      exec: () => command.execOut("-e", "console.log('some log')"),
      expectedOutput: "some log\n",
      execScript:
        "const command = new exec.Command('node');\n\
        command.execOut('-e', 'console.log(\"some log\")');",
    },
    onFailed: {
      exec: () => command.execOut("-e", "throw new Error('some error')"),
      execScript:
        "const command = new exec.Command('node');\n\
        command.execOut('-e', 'throw new Error(\"some error\")');",
    },
  });

  testExecOnSuccessAndFailed({
    title: "executes the command silently and gets the output",
    shouldBeSilent: true,
    onSuccess: {
      exec: () => command.execOutSilently("-e", "console.log('some log')"),
      expectedOutput: "some log\n",
      execScript:
        "const command = new exec.Command('node');\n\
        command.execOutSilently('-e', 'console.log(\"some log\")');",
    },
    onFailed: {
      exec: () =>
        command.execOutSilently("-e", "throw new Error('some error')"),
      execScript:
        "const command = new exec.Command('node');\n\
        command.execOutSilently('-e', 'throw new Error(\"some error\")');",
    },
  });
});
