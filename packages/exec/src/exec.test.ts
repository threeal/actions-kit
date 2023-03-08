import { describe, expect, test } from "@jest/globals";
import { exec, execOut } from "./exec";

describe("test command executions", () => {
  describe("execute a command", () => {
    test("should be resolved", async () => {
      const prom = exec("node", ["-e", "process.exit()"]);
      await expect(prom).resolves.toBeUndefined();
    });
  });

  describe("execute a failed command", () => {
    test("should be rejected", async () => {
      const prom = exec("node", ["-e", "process.exit(1)"]);
      await expect(prom).rejects.toThrowError();
    });
  });
});

describe("test command executions with output", () => {
  describe("execute a command", () => {
    test("should be resolved", async () => {
      const prom = execOut("node", ["-e", "console.log('some log');"]);
      await expect(prom).resolves.toBe("some log\n");
    });
  });

  describe("execute a failed command", () => {
    test("should be rejected", async () => {
      const prom = execOut("node", ["-e", "process.exit(1)"]);
      await expect(prom).rejects.toThrowError();
    });
  });
});
