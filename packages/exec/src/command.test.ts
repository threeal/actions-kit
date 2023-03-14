import { beforeAll, describe, expect, test } from "@jest/globals";
import { Command } from "./command";
import { Result } from "./result";

describe("constrcuts a new command", () => {
  let command: Command;
  test("should not throws an error", () => {
    expect(() => {
      command = new Command("node", "--no-addons", "--no-deprecation");
    }).not.toThrow();
  });

  describe("checks the properties", () => {
    test("the command should be equals", () => {
      expect(command.command).toEqual("node");
    });
    test("the arguments should be equal", () => {
      expect(command.args).toEqual(["--no-addons", "--no-deprecation"]);
    });
  });

  describe("executes the command", () => {
    describe("on a successful command", () => {
      let prom: Promise<Result>;
      test("should be resolved", () => {
        prom = command.exec("-e", "process.exit();");
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
        prom = command.exec("-e", "process.exit(1)");
        return expect(prom).resolves.toBeTruthy();
      });
      describe("checks the result", () => {
        let res: Result;
        beforeAll(async () => (res = await prom));
        test("the status should not be ok", () =>
          expect(res.isOk()).toBe(false));
      });
    });
  });
});
