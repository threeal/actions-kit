import { expect, jest, test } from "@jest/globals";
import { error, fatal, warning } from "./log";

let warningOut = "";
let errorOut = "";
let setFailedOut = "";

jest.mock("@actions/core", () => ({
  ...jest.requireActual<object>("@actions/core"),
  warning: (message: string) => {
    warningOut = message;
  },
  error: (message: string) => {
    errorOut = message;
  },
  setFailed: (message: string) => {
    setFailedOut = message;
  },
}));

test("writes a warning message to log", () => {
  warning("some warning message");
  expect(warningOut).toBe("some warning message");
});

test("writes an error message to log", () => {
  error("some error message");
  expect(errorOut).toBe("some error message");
});

test("writes a fatal message to log", () => {
  fatal("some fatal message");
  expect(setFailedOut).toBe("some fatal message");
});
