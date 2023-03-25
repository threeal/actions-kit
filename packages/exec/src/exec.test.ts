import { beforeAll, describe, expect, test } from "@jest/globals";
import { exec, execOut, execSilently } from "./exec";
import { Result } from "./result";

interface TestExecParams {
  title: string;
  successExec: () => Promise<Result>;
  failExec: () => Promise<Result>;
}

function testExec(params: TestExecParams) {
  describe(params.title, () => {
    describe("on a successful command", () => {
      let prom: Promise<Result>;
      test("should be resolved", () => {
        prom = params.successExec();
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
        prom = params.failExec();
        return expect(prom).resolves.toBeTruthy();
      });
      describe("checks the result", () => {
        let res: Result;
        beforeAll(async () => (res = await prom));
        test("the status should not be ok", () => {
          expect(res.isOk()).toBe(false);
        });
      });
    });
  });
}

testExec({
  title: "executes a command",
  successExec: () => exec("node", "-e", "process.exit();"),
  failExec: () => exec("node", "-e", "process.exit(1)"),
});

testExec({
  title: "executes a command silently",
  successExec: () => execSilently("node", "-e", "process.exit();"),
  failExec: () => execSilently("node", "-e", "process.exit(1)"),
});

describe("executes a command and gets the output", () => {
  describe("on a successful command", () => {
    let prom: Promise<Result>;
    test("should be resolved", () => {
      prom = execOut("node", "-e", "console.log('some log');");
      return expect(prom).resolves.toBeTruthy();
    });
    describe("checks the result", () => {
      let res: Result;
      beforeAll(async () => (res = await prom));
      test("the status should be ok", () => expect(res.isOk()).toBe(true));
      test("the output should be correct", () => {
        expect(res.output).toBe("some log\n");
      });
    });
  });

  describe("on a failed command", () => {
    let prom: Promise<Result>;
    test("should be resolved", () => {
      prom = execOut("node", "-e", "process.exit(1)");
      return expect(prom).resolves.toBeTruthy();
    });
    describe("checks the result", () => {
      let res: Result;
      beforeAll(async () => (res = await prom));
      test("the status should not be ok", () => expect(res.isOk()).toBe(false));
    });
  });
});
