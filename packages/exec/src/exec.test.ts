import { beforeAll, describe, expect, test } from "@jest/globals";
import { exec, execOut, execOutCheck } from "./exec";
import { Result } from "./result";

describe("executes a command", () => {
  describe("on a successful command", () => {
    let prom: Promise<Result>;
    test("should be resolved", () => {
      prom = exec("node", ["-e", "process.exit();"]);
      return expect(prom).resolves.toBeTruthy();
    });
    describe("checks the result", () => {
      let res: Result;
      beforeAll(async () => (res = await prom));
      test("the status should be ok", () => expect(res.isOk()).toBe(true));
    });
  });

  describe("on a failed command", () => {
    let prom: Promise<Result>;
    test("should be resolved", () => {
      prom = exec("node", ["-e", "process.exit(1)"]);
      return expect(prom).resolves.toBeTruthy();
    });
    describe("checks the result", () => {
      let res: Result;
      beforeAll(async () => (res = await prom));
      test("the status should not be ok", () => expect(res.isOk()).toBe(false));
    });
  });
});

describe("executes a command and gets the output", () => {
  describe("on a successful command", () => {
    test("should be resolved with an output", () => {
      const prom = execOut("node", ["-e", "console.log('some log');"]);
      return expect(prom).resolves.toBe("some log\n");
    });
  });

  describe("on a failed command", () => {
    test("should be rejected", () => {
      const prom = execOut("node", ["-e", "process.exit(1)"]);
      return expect(prom).rejects.toThrowError();
    });
  });
});

describe("executes a command and gets the output and status", () => {
  describe("on a successful command", () => {
    let prom: Promise<Result>;
    test("should be resolved", () => {
      prom = execOutCheck("node", ["-e", "console.log('some log');"]);
      return expect(prom).resolves.toBeTruthy();
    });
    describe("checks the result", () => {
      let res: Result;
      beforeAll(async () => (res = await prom));
      test("the output should be correct", () =>
        expect(res.output).toBe("some log\n"));
      test("the status should be ok", () => expect(res.isOk()).toBe(true));
    });
  });

  describe("on a failed command", () => {
    let prom: Promise<Result>;
    test("should be resolved", () => {
      prom = execOutCheck("node", ["-e", "process.exit(1)"]);
      return expect(prom).resolves.toBeTruthy();
    });
    describe("checks the result", () => {
      let res: Result;
      beforeAll(async () => (res = await prom));
      test("the status should not be ok", () => expect(res.isOk()).toBe(false));
    });
  });
});
