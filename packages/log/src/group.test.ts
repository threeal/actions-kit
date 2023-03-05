import { beforeAll, describe, expect, test } from "@jest/globals";
import { group } from "./group";
import { info } from "./log";
import { flushStdout, stdout } from "./internal/stdout.test";

describe("test output grouping of an async function", () => {
  describe("output grouping of a successful function", () => {
    beforeAll(() => flushStdout());

    describe("create a group", () => {
      test("should not failed", async () => {
        const prom = group("some group", async () => {
          info("some info");
          return true;
        });
        expect(prom).resolves.toBe(true);
      });
    });

    describe("check output", () => {
      test("group name should be written", () => {
        expect(stdout()).toMatch(/some group/);
      });
      test("should output success info", () => {
        expect(stdout()).toMatch(/Done in \d*(ms|s|m|h)( \d*(ms|s|m))?/);
      });
      test("output order should be correct", () => {
        const groupStartIndex = stdout().indexOf("GROUP_START");
        const infoIndex = stdout().indexOf("some info");
        const doneIndex = stdout().indexOf("Done in");
        const groupEndIndex = stdout().indexOf("GROUP_END");
        expect(groupStartIndex).toBeLessThan(infoIndex);
        expect(infoIndex).toBeLessThan(doneIndex);
        expect(doneIndex).toBeLessThan(groupEndIndex);
      });
    });
  });

  describe("output grouping of a failed function", () => {
    beforeAll(() => flushStdout());

    describe("create a group", () => {
      test("should failed", async () => {
        const prom = group("some group", async () => {
          info("some info");
          throw new Error("some error");
        });
        expect(prom).rejects.toThrow();
      });
    });

    describe("check output", () => {
      test("group name should be written", () => {
        expect(stdout()).toMatch(/some group/);
      });
      test("should output failure info", () => {
        expect(stdout()).toMatch(/Failed in \d*(ms|s|m|h)( \d*(ms|s|m))?/);
      });
      test("output order should be correct", () => {
        const groupStartIndex = stdout().indexOf("GROUP_START");
        const infoIndex = stdout().indexOf("some info");
        const failedIndex = stdout().indexOf("Failed in");
        const groupEndIndex = stdout().indexOf("GROUP_END");
        expect(groupStartIndex).toBeLessThan(infoIndex);
        expect(infoIndex).toBeLessThan(failedIndex);
        expect(failedIndex).toBeLessThan(groupEndIndex);
      });
    });
  });
});
