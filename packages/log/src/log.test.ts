import { beforeAll, describe, expect, test } from "@jest/globals";
import { error, fatal, warning } from "./log";
import { nodeExec } from "./internal/exec.test";

describe("test writes warning to log", () => {
  test("should not throw", () => {
    expect(() => warning("some message")).not.toThrow();
  });

  describe("check output", () => {
    let prom: Promise<string>;
    beforeAll(() => {
      const code = [
        "const log = require('./packages/log/lib');",
        "log.warning('some message');",
      ].join("\n");
      prom = nodeExec(code);
    });
    test("message should be written", async () => {
      await expect(prom).resolves.toMatch(/some message/);
    });
    test("warning label should be written", async () => {
      await expect(prom).resolves.toMatch(/::warning::/);
    });
  });
});

describe("test writes error to log", () => {
  test("should not throw", () => {
    expect(() => error("some message")).not.toThrow();
  });

  describe("check output", () => {
    let prom: Promise<string>;
    beforeAll(() => {
      const code = [
        "const log = require('./packages/log/lib');",
        "log.error('some message');",
      ].join("\n");
      prom = nodeExec(code);
    });
    test("message should be written", async () => {
      await expect(prom).resolves.toMatch(/some message/);
    });
    test("error label should be written", async () => {
      await expect(prom).resolves.toMatch(/::error::/);
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
      out = await nodeExec(code);
    });
    test("message should be written", () => {
      expect(out).toMatch(/some message/);
    });
    test("error label should be written", () => {
      expect(out).toMatch(/::error::/);
    });
  });
});
