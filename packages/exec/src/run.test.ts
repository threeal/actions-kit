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
        throw new Error(`unknown argument ${arg}`);
      }
    }
  }
  return 0;
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

test("runs a command", async () => {
  const res = await run("test", "--no-silent");
  expect(res.isOk()).toBe(true);
});

test("runs a command silently", async () => {
  const res = await runSilently("test", "--silent");
  expect(res.isOk()).toBe(true);
});
