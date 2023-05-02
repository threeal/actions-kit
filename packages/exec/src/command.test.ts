import { expect, jest, test } from "@jest/globals";
import { Command } from "./command";
import { OutputResult } from "./output";
import { RunResult } from "./run";

jest.mock("./output", () => {
  const actual = jest.requireActual<object>("./output");
  return {
    ...actual,
    output: async (command: string, ...args: string[]) => {
      expect(command).toBe("test");
      expect(args).not.toContain("--silent");
      const output = args.join();
      return new OutputResult(0, output);
    },
    outputSilently: async (command: string, ...args: string[]) => {
      expect(command).toBe("test");
      expect(args).toContain("--silent");
      const output = args.filter((arg) => arg !== "--silent").join();
      return new OutputResult(0, output);
    },
  };
});

jest.mock("./run", () => {
  const actual = jest.requireActual<object>("./run");
  return {
    ...actual,
    run: async (command: string, ...args: string[]) => {
      expect(command).toBe("test");
      expect(args).not.toContain("--silent");
      return new RunResult(0);
    },
    runSilently: async (command: string, ...args: string[]) => {
      expect(command).toBe("test");
      expect(args).toContain("--silent");
      return new RunResult(0);
    },
  };
});

test("constructs a new command", () => {
  const command = new Command("command", "arg1", "arg2");
  expect(command.command).toEqual("command");
  expect(command.args).toEqual(["arg1", "arg2"]);
});

test("runs a constructed command", async () => {
  const command = new Command("test");
  const res = await command.run();
  expect(res.isOk()).toBe(true);
});

test("runs a constructed command silently", async () => {
  const command = new Command("test");
  const res = await command.runSilently("--silent");
  expect(res.isOk()).toBe(true);
});

test("runs a constructed command and gets the output", async () => {
  const command = new Command("test");
  const res = await command.output("some output");
  expect(res.isOk()).toBe(true);
  expect(res.output).toBe("some output");
});

test("runs a constructed command and gets the output silently", async () => {
  const command = new Command("test");
  const res = await command.outputSilently("--silent", "some output");
  expect(res.isOk()).toBe(true);
  expect(res.output).toBe("some output");
});
