import * as exec from "@actions/exec";
import { describe, expect, jest, test } from "@jest/globals";
import { run, RunResult, runSilently } from "./run";

jest.mock("@actions/exec");
const mockedExec = jest.mocked(exec, { shallow: true });

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

test("runs a command", () => {
  mockedExec.exec.mockResolvedValue(0);
  const prom = run("command", "arg1", "arg2");
  expect(prom).resolves.toStrictEqual(new RunResult(0));
  const args = mockedExec.exec.mock.lastCall;
  expect(args?.[0]).toBe("command");
  expect(args?.[1]).toStrictEqual(["arg1", "arg2"]);
  expect(args?.[2]?.silent).toBe(false);
});

test("runs a command silently", () => {
  mockedExec.exec.mockResolvedValue(0);
  const prom = runSilently("command", "arg1", "arg2");
  expect(prom).resolves.toStrictEqual(new RunResult(0));
  const args = mockedExec.exec.mock.lastCall;
  expect(args?.[0]).toBe("command");
  expect(args?.[1]).toStrictEqual(["arg1", "arg2"]);
  expect(args?.[2]?.silent).toBe(true);
});
