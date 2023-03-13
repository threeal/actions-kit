import { describe, expect, test } from "@jest/globals";
import { Command } from "./command";

describe("constrcuts a new command", () => {
  let command: Command;
  test("should not throw an error", () => {
    expect(
      () => (command = new Command("node", "--no-addons", "-e"))
    ).not.toThrow();
  });
  describe("checks properties", () => {
    test("the command should be equals", () => {
      expect(command.command).toEqual("node");
    });
    test("arguments should be equal", () => {
      expect(command.args).toEqual(["--no-addons", "-e"]);
    });
  });
});
