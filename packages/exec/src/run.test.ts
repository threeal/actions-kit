import { ExecOptions } from "@actions/exec";
import { describe, expect, jest, test } from "@jest/globals";
import { run, RunResult, runSilently } from "./run";

jest.mock("@actions/exec", () => {
  const actual = jest.requireActual<object>("@actions/exec");
  return {
    ...actual,
    exec: async (commandLine: string, args: string[], options: ExecOptions) => {
      expect(commandLine).toBe("test");
      expect(options.silent).toBe(args.includes("--silent"));
      return args.includes("--fail") ? 1 : 0;
    },
  };
});

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
  test("on a successful command", async () => {
    const res = await run("test");
    expect(res.isOk()).toBe(true);
  });

  test("on a failed command", async () => {
    const res = await run("test", "--fail");
    expect(res.isOk()).toBe(false);
  });
});

describe("runs a command silently", () => {
  test("on a successful command", async () => {
    const res = await runSilently("test", "--silent");
    expect(res.isOk()).toBe(true);
  });

  test("on a failed command", async () => {
    const res = await runSilently("test", "--silent", "--fail");
    expect(res.isOk()).toBe(false);
  });
});
