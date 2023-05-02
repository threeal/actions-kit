import { expect, jest, test } from "@jest/globals";
import { Command } from "./command";
import { OutputResult } from "./output";
import { RunResult } from "./run";

jest.mock("./output", () => {
  const actual = jest.requireActual<object>("./output");
  const outputCheck = (command: string, ...args: string[]) => {
    expect(command).toBe("test");
    const output = args
      .filter((arg) => !["--success", "--silent"].includes(arg))
      .join();
    const code = args.includes("--success") ? 0 : 1;
    return new OutputResult(code, output);
  };
  return {
    ...actual,
    output: async (command: string, ...args: string[]) => {
      expect(args).not.toContain("--silent");
      return outputCheck(command, ...args);
    },
    outputSilently: async (command: string, ...args: string[]) => {
      expect(args).toContain("--silent");
      return outputCheck(command, ...args);
    },
  };
});

jest.mock("./run", () => {
  const actual = jest.requireActual<object>("./run");
  const runCheck = (command: string, ...args: string[]) => {
    expect(command).toBe("test");
    const code = args.includes("--success") ? 0 : 1;
    return new RunResult(code);
  };
  return {
    ...actual,
    run: async (command: string, ...args: string[]) => {
      expect(args).not.toContain("--silent");
      return runCheck(command, ...args);
    },
    runSilently: async (command: string, ...args: string[]) => {
      expect(args).toContain("--silent");
      return runCheck(command, ...args);
    },
  };
});

test("constructs a new command", () => {
  const command = new Command("command", "arg1", "arg2");
  expect(command.command).toEqual("command");
  expect(command.args).toEqual(["arg1", "arg2"]);
});

test("runs a constructed command", async () => {
  const command = new Command("test", "--success");
  const res = await command.run();
  expect(res.isOk()).toBe(true);
});

test("runs a constructed command silently", async () => {
  const command = new Command("test", "--success");
  const res = await command.runSilently("--silent");
  expect(res.isOk()).toBe(true);
});

test("runs a constructed command and gets the output", async () => {
  const command = new Command("test", "--success");
  const res = await command.output("some output");
  expect(res.isOk()).toBe(true);
  expect(res.output).toBe("some output");
});

test("runs a constructed command and gets the output silently", async () => {
  const command = new Command("test", "--success");
  const res = await command.outputSilently("--silent", "some output");
  expect(res.isOk()).toBe(true);
  expect(res.output).toBe("some output");
});
