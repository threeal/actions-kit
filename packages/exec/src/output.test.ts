import { getExecOutput, ExecOutput } from "@actions/exec";
import { describe, expect, jest, test } from "@jest/globals";
import { output, OutputResult, outputSilently } from "./output";

jest.mock("@actions/exec");

const mocked = jest.mocked({ getExecOutput });

mocked.getExecOutput.mockImplementation(async (commandLine, args, options) => {
  expect(commandLine).toBe("test");
  if (args === undefined) throw new Error("args should not be undefined");
  if (options === undefined) throw new Error("options should not be undefined");
  let silent = false;
  const out: ExecOutput = { exitCode: 0, stdout: "", stderr: "" };
  for (const arg of args) {
    switch (arg) {
      case "--silent":
        silent = true;
        break;
      case "--fail":
        out.exitCode = 1;
        break;
      default:
        out.stdout += arg;
    }
  }
  expect(options.silent).toBe(silent);
  return out;
});

describe("constructs a new command run and output get result", () => {
  test("with a zero status code", () => {
    const res = new OutputResult(0, "some message");
    expect(res.code).toBe(0);
    expect(res.isOk()).toBe(true);
  });

  test("with a non zero status code", () => {
    const res = new OutputResult(8, "some message");
    expect(res.code).toBe(8);
    expect(res.isOk()).toBe(false);
  });
});

describe("runs a command and gets the output", () => {
  test("on a successful command", async () => {
    const res = await output("test", "some message");
    expect(res.isOk()).toBe(true);
    expect(res.output).toBe("some message");
  });

  test("on a failed command", async () => {
    const res = await output("test", "--fail", "some message");
    expect(res.isOk()).toBe(false);
    expect(res.output).toBe("some message");
  });
});

describe("runs a command and gets the output silently", () => {
  test("on a successful command", async () => {
    const res = await outputSilently("test", "--silent", "some message");
    expect(res.isOk()).toBe(true);
    expect(res.output).toBe("some message");
  });

  test("on a failed command", async () => {
    const args = ["--silent", "--fail", "some message"];
    const res = await outputSilently("test", ...args);
    expect(res.isOk()).toBe(false);
    expect(res.output).toBe("some message");
  });
});
