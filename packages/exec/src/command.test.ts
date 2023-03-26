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
    onSuccess: {
      exec: () => command.exec("-e", "process.exit();"),
    },
    onFailed: {
      exec: () => command.exec("-e", "process.exit(1)"),
    },
  });

  testExecOnSuccessAndFailed({
    title: "executes the command silently",
    onSuccess: {
      exec: () => command.execSilently("-e", "process.exit();"),
    },
    onFailed: {
      exec: () => command.execSilently("-e", "process.exit(1)"),
    },
  });

  testExecOnSuccessAndFailed({
    title: "executes the command and gets the output",
    onSuccess: {
      exec: () => command.execOut("-e", "console.log('some log');"),
      expectedOutput: "some log\n",
    },
    onFailed: {
      exec: () => command.execOut("-e", "process.exit(1)"),
    },
  });

  testExecOnSuccessAndFailed({
    title: "executes the command silently and gets the output",
    onSuccess: {
      exec: () => command.execOutSilently("-e", "console.log('some log');"),
      expectedOutput: "some log\n",
    },
    onFailed: {
      exec: () => command.execOutSilently("-e", "process.exit(1)"),
    },
  });
});
