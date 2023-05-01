import * as exec from "@actions/exec";
import { describe, expect, jest, test } from "@jest/globals";
import { run, RunResult, runSilently } from "./run";

jest.mock("@actions/exec");

const mocked = {
  exec: jest.mocked(exec, { shallow: true }),
};

mocked.exec.exec.mockImplementation(async (commandLine, args, options) => {
  expect(commandLine).toBe("test");
  if (args === undefined) throw new Error("args should not be undefined");
  if (options === undefined) throw new Error("options should not be undefined");
  for (const arg of args) {
    switch (arg) {
      case "--no-silent": {
        expect(options.silent).toBe(false);
        break;
      }
      case "--silent": {
        expect(options.silent).toBe(true);
        break;
      }
      default: {
        return parseInt(arg);
      }
    }
  }
  throw new Error("args should contains an exit code");
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
    const res = await run("test", "--no-silent", "0");
    expect(res.isOk()).toBe(true);
  });

  test("on a failed command", async () => {
    const res = await run("test", "--no-silent", "1");
    expect(res.isOk()).toBe(false);
  });
});

describe("runs a command silently", () => {
  test("on a successful command", async () => {
    const res = await runSilently("test", "--silent", "0");
    expect(res.isOk()).toBe(true);
  });

  test("on a failed command", async () => {
    const res = await runSilently("test", "--silent", "1");
    expect(res.isOk()).toBe(false);
  });
});
