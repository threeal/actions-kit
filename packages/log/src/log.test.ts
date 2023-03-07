import { beforeAll, describe, expect, test } from "@jest/globals";
import { error, warning } from "./log";
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
      await expect(prom).resolves.toMatch(/warning/i);
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
      await expect(prom).resolves.toMatch(/error/i);
    });
  });
});
