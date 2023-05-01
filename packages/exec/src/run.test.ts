import { exec } from "@actions/exec";
import { describe, expect, jest, test } from "@jest/globals";
import { run, RunResult, runSilently } from "./run";

jest.mock("@actions/exec");

const mocked = jest.mocked({ exec });

mocked.exec.mockImplementation(async (commandLine, args, options) => {
  expect(commandLine).toBe("test");
  if (args === undefined) throw new Error("args should not be undefined");
  if (options === undefined) throw new Error("options should not be undefined");
  let code = 0;
  for (const arg of args) {
    switch (arg) {
      case "--no-silent":
        expect(options.silent).toBe(false);
        break;
      case "--silent":
        expect(options.silent).toBe(true);
        break;
      case "--fail":
        code = 1;
        break;
      default:
        throw new Error(`unknown argument: ${arg}`);
    }
  }
  return code;
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
    const res = await run("test", "--no-silent");
    expect(res.isOk()).toBe(true);
  });

  test("on a failed command", async () => {
    const res = await run("test", "--no-silent", "--fail");
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
