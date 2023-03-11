import * as exec from "@actions-kit/exec";
import { beforeAll, describe, expect, test } from "@jest/globals";
import { error, fatal, warning } from "./log";

describe("writes warning to log", () => {
  test("should not throw", () => {
    expect(() => warning("some message")).not.toThrow();
  });
  describe("runs in a separate process", () => {
    let prom: Promise<string>;
    test("should be resolved", () => {
      const code = [
        "const log = require('./packages/log/lib');",
        "log.warning('some message');",
      ].join("\n");
      prom = exec.execOut("node", ["-e", code]);
      return expect(prom).resolves.toBeTruthy();
    });
    describe("checks output", () => {
      let out: string;
      beforeAll(async () => (out = await prom));
      test("message should be written", () => {
        expect(out).toMatch(/some message/);
      });
      test("warning label should be written", () => {
        expect(out).toMatch(/::warning::/);
      });
    });
  });
});

describe("writes error to log", () => {
  test("should not throw", () => {
    expect(() => error("some message")).not.toThrow();
  });
  describe("runs in a separate process", () => {
    let prom: Promise<string>;
    test("should be resolved", () => {
      const code = [
        "const log = require('./packages/log/lib');",
        "log.error('some message');",
      ].join("\n");
      prom = exec.execOut("node", ["-e", code]);
      return expect(prom).resolves.toBeTruthy();
    });
    describe("checks output", () => {
      let out: string;
      beforeAll(async () => (out = await prom));
      test("message should be written", () => {
        expect(out).toMatch(/some message/);
      });
      test("error label should be written", () => {
        expect(out).toMatch(/::error::/);
      });
    });
  });
});

describe("writes error to log and sets the action status to failed", () => {
  test("should not throw", () => {
    expect(() => fatal("some message")).not.toThrow();
  });

  describe("check output", () => {
    let out: string;
    beforeAll(async () => {
      const code = [
        "const log = require('./packages/log/lib');",
        "log.fatal('some message');",
      ].join("\n");
      out = await exec.execOut("node", ["-e", code]);
    });
    test("message should be written", () => {
      expect(out).toMatch(/some message/);
    });
    test("error label should be written", () => {
      expect(out).toMatch(/::error::/);
    });
  });
});
