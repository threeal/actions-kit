import * as exec from "@actions/exec";
import { expect, jest, test } from "@jest/globals";
import { output, OutputResult, outputSilently } from "./output";

jest.mock("@actions/exec");
const mockedExec = jest.mocked(exec, { shallow: true });

test("constructs a new command run and output get result", () => {
  const res = new OutputResult(0, "some message");
  expect(res.code).toBe(0);
  expect(res.output).toBe("some message");
});

test("runs a command and gets the output", () => {
  mockedExec.getExecOutput.mockResolvedValue({
    exitCode: 0,
    stdout: "some message",
    stderr: "",
  });
  const prom = output("command", "arg1", "arg2");
  expect(prom).resolves.toStrictEqual(new OutputResult(0, "some message"));
  const args = mockedExec.getExecOutput.mock.lastCall;
  expect(args?.[0]).toBe("command");
  expect(args?.[1]).toStrictEqual(["arg1", "arg2"]);
  expect(args?.[2]?.silent).toBe(false);
});

test("runs a command and gets the output silently", () => {
  mockedExec.getExecOutput.mockResolvedValue({
    exitCode: 0,
    stdout: "some message",
    stderr: "",
  });
  const prom = outputSilently("command", "arg1", "arg2");
  expect(prom).resolves.toStrictEqual(new OutputResult(0, "some message"));
  const args = mockedExec.getExecOutput.mock.lastCall;
  expect(args?.[0]).toBe("command");
  expect(args?.[1]).toStrictEqual(["arg1", "arg2"]);
  expect(args?.[2]?.silent).toBe(true);
});
