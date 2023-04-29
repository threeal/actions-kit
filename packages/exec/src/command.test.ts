import * as exec from "@actions/exec";
import { describe, expect, jest, test } from "@jest/globals";
import { Command } from "./command";
import { OutputResult } from "./output";
import { RunResult } from "./run";

jest.mock("@actions/exec");
const mockedExec = jest.mocked(exec, { shallow: true });

describe("constructs a new command", () => {
  let command: Command;
  test("should not throws an error", () => {
    expect(() => {
      command = new Command("command", "arg1", "arg2");
    }).not.toThrow();
  });

  describe("checks the properties", () => {
    test("the command should be equals", () => {
      expect(command.command).toEqual("command");
    });
    test("the arguments should be equal", () => {
      expect(command.args).toEqual(["arg1", "arg2"]);
    });
  });

  test("runs the command", () => {
    mockedExec.exec.mockResolvedValue(0);
    const prom = command.run("arg1", "arg2", "arg3");
    expect(prom).resolves.toStrictEqual(new RunResult(0));
    const args = mockedExec.exec.mock.lastCall;
    expect(args?.[0]).toBe("command");
    expect(args?.[1]).toStrictEqual(["arg1", "arg2", "arg1", "arg2", "arg3"]);
    expect(args?.[2]?.silent).toBe(false);
  });

  test("runs the command silently", () => {
    mockedExec.exec.mockResolvedValue(0);
    const prom = command.runSilently("arg1", "arg2", "arg3");
    expect(prom).resolves.toStrictEqual(new RunResult(0));
    const args = mockedExec.exec.mock.lastCall;
    expect(args?.[0]).toBe("command");
    expect(args?.[1]).toStrictEqual(["arg1", "arg2", "arg1", "arg2", "arg3"]);
    expect(args?.[2]?.silent).toBe(true);
  });

  test("runs the command and gets the output", () => {
    mockedExec.getExecOutput.mockResolvedValue({
      exitCode: 0,
      stdout: "some message",
      stderr: "",
    });
    const prom = command.output("arg1", "arg2", "arg3");
    expect(prom).resolves.toStrictEqual(new OutputResult(0, "some message"));
    const args = mockedExec.getExecOutput.mock.lastCall;
    expect(args?.[0]).toBe("command");
    expect(args?.[1]).toStrictEqual(["arg1", "arg2", "arg1", "arg2", "arg3"]);
    expect(args?.[2]?.silent).toBe(false);
  });

  test("runs the command and gets the output silently", () => {
    mockedExec.getExecOutput.mockResolvedValue({
      exitCode: 0,
      stdout: "some message",
      stderr: "",
    });
    const prom = command.outputSilently("arg1", "arg2", "arg3");
    expect(prom).resolves.toStrictEqual(new OutputResult(0, "some message"));
    const args = mockedExec.getExecOutput.mock.lastCall;
    expect(args?.[0]).toBe("command");
    expect(args?.[1]).toStrictEqual(["arg1", "arg2", "arg1", "arg2", "arg3"]);
    expect(args?.[2]?.silent).toBe(true);
  });
});
