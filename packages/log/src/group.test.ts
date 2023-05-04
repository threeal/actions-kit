import { describe, expect, test } from "@jest/globals";
import { group } from "./group";
import { info } from "./log";

describe("group output of an async function", () => {
  describe("on a successful function", () => {
    test("should be resolved", () => {
      const prom = group("some group", async () => {
        info("some info");
        return true;
      });
      return expect(prom).resolves.toBe(true);
    });
  });

  describe("on a failed function", () => {
    test("should be rejected", () => {
      const prom = group("some group", async () => {
        info("some info");
        throw new Error("some error");
      });
      return expect(prom).rejects.toThrow();
    });
  });
});
