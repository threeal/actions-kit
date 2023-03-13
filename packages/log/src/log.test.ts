import * as exec from "@actions-kit/exec";
import { beforeAll, describe, expect, test } from "@jest/globals";
import { error, fatal, warning } from "./log";

describe("writes warning to log", () => {
  test("should not throw", () => {
    expect(() => warning("some message")).not.toThrow();
  });
  describe("runs in a separate process", () => {
    let prom: Promise<exec.Result>;
    test("should be resolved", () => {
      const code = [
        "const log = require('./packages/log/lib');",
        "log.warning('some message');",
      ].join("\n");
      prom = exec.execOut("node", "-e", code);
      return expect(prom).resolves.toBeTruthy();
    });
    describe("checks output", () => {
      let res: exec.Result;
      beforeAll(async () => (res = await prom));
      test("message should be written", () => {
        expect(res.output).toMatch(/some message/);
      });
      test("warning label should be written", () => {
        expect(res.output).toMatch(/::warning::/);
      });
    });
  });
});

describe("writes error to log", () => {
  test("should not throw", () => {
    expect(() => error("some message")).not.toThrow();
  });
  describe("runs in a separate process", () => {
    let prom: Promise<exec.Result>;
    test("should be resolved", () => {
      const code = [
        "const log = require('./packages/log/lib');",
        "log.error('some message');",
      ].join("\n");
      prom = exec.execOut("node", "-e", code);
      return expect(prom).resolves.toBeTruthy();
    });
    describe("checks output", () => {
      let res: exec.Result;
      beforeAll(async () => (res = await prom));
      test("message should be written", () => {
        expect(res.output).toMatch(/some message/);
      });
      test("error label should be written", () => {
        expect(res.output).toMatch(/::error::/);
      });
    });
  });
});

describe("writes a fatal message to the log", () => {
  test("should not throws an error", () => {
    expect(() => fatal("some message")).not.toThrow();
  });
  describe("runs in a separate process", () => {
    let prom: Promise<exec.Result>;
    test("should be resolved", () => {
      const code = [
        "const log = require('./packages/log/lib');",
        "log.fatal('some message');",
      ].join("\n");
      prom = exec.execOut("node", "-e", code);
      return expect(prom).resolves.toBeTruthy();
    });
    describe("checks the output and the status", () => {
      let res: exec.Result;
      beforeAll(async () => (res = await prom));
      test("the output should contains the message", () => {
        expect(res.output).toMatch(/some message/);
      });
      test("the output should contains an error label", () => {
        expect(res.output).toMatch(/::error::/);
      });
      test("the status should not be ok", () => {
        expect(res.isOk()).toBe(false);
      });
    });
  });
});
