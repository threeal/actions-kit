import { expect, jest, test } from "@jest/globals";
import { Command } from "./command";
import { output, OutputResult, outputSilently } from "./output";
import { run, RunResult, runSilently } from "./run";

jest.mock("./output");
jest.mock("./run");

const mocked = jest.mocked(
  { output, outputSilently, run, runSilently },
  { shallow: true }
);

test("constructs a new command", () => {
  const command = new Command("command", "arg1", "arg2");
  expect(command.command).toEqual("command");
  expect(command.args).toEqual(["arg1", "arg2"]);
});

const command = new Command("command", "arg1", "arg2");

const runRes = new RunResult(0);
mocked.run.mockImplementation(async () => runRes);
mocked.runSilently.mockImplementation(async () => runRes);

test("runs a constructed command", () => {
  const prom = command.run("arg3");
  expect(prom).resolves.toStrictEqual(runRes);
  const args = mocked.run.mock.lastCall;
  expect(args).toStrictEqual(["command", "arg1", "arg2", "arg3"]);
});

test("runs a constructed command silently", () => {
  const prom = command.runSilently("arg3");
  expect(prom).resolves.toStrictEqual(runRes);
  const args = mocked.runSilently.mock.lastCall;
  expect(args).toStrictEqual(["command", "arg1", "arg2", "arg3"]);
});

const outputRes = new OutputResult(0, "some message");
mocked.output.mockImplementation(async () => outputRes);
mocked.outputSilently.mockImplementation(async () => outputRes);

test("runs a constructed command and gets the output", () => {
  const prom = command.output("arg3");
  expect(prom).resolves.toStrictEqual(outputRes);
  const args = mocked.output.mock.lastCall;
  expect(args).toStrictEqual(["command", "arg1", "arg2", "arg3"]);
});

test("runs a constructed command and gets the output silently", () => {
  const prom = command.outputSilently("arg3");
  expect(prom).resolves.toStrictEqual(outputRes);
  const args = mocked.outputSilently.mock.lastCall;
  expect(args).toStrictEqual(["command", "arg1", "arg2", "arg3"]);
});
