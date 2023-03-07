import { beforeAll, describe, expect, test } from "@jest/globals";
import { group } from "./group";
import { info } from "./log";
import { nodeExec } from "./internal/exec.test";

describe("test output grouping of an async function", () => {
  describe("output grouping of a successful function", () => {
    test("should be resoved", async () => {
      const prom = group("some group", async () => {
        info("some info");
        return true;
      });
      expect(prom).resolves.toBe(true);
    });

    describe("check output", () => {
      let prom: Promise<string>;
      beforeAll(() => {
        const code = [
          "const log = require('./packages/log/lib');",
          "log.group('some group', async () => {",
          "  log.info('some info');",
          "  return true;",
          "});",
        ].join("\n");
        prom = nodeExec(code);
      });
      test("group name should be written", async () => {
        await expect(prom).resolves.toMatch(/some group/);
      });
      test("should output success info", async () => {
        await expect(prom).resolves.toMatch(
          /Done in \d*(ms|s|m|h)( \d*(ms|s|m))?/
        );
      });
      test("output order should be correct", async () => {
        const out = await prom;
        const groupStartIndex = out.indexOf("::group::");
        const infoIndex = out.indexOf("some info");
        const doneIndex = out.indexOf("Done in");
        const groupEndIndex = out.indexOf("::endgroup::");
        expect(groupStartIndex).toBeLessThan(infoIndex);
        expect(infoIndex).toBeLessThan(doneIndex);
        expect(doneIndex).toBeLessThan(groupEndIndex);
      });
    });
  });

  describe("output grouping of a failed function", () => {
    test("should be rejected", async () => {
      const prom = group("some group", async () => {
        info("some info");
        throw new Error("some error");
      });
      expect(prom).rejects.toThrow();
    });

    describe("check output", () => {
      let prom: Promise<string>;
      beforeAll(() => {
        const code = [
          "const log = require('./packages/log/lib');",
          "log.group('some group', async () => {",
          "  log.info('some info');",
          "  throw new Error('some error');",
          "}).catch((err) => {});",
        ].join("\n");
        prom = nodeExec(code);
      });
      test("group name should be written", async () => {
        await expect(prom).resolves.toMatch(/some group/);
      });
      test("should output failure info", async () => {
        await expect(prom).resolves.toMatch(
          /Failed in \d*(ms|s|m|h)( \d*(ms|s|m))?/
        );
      });
      test("output order should be correct", async () => {
        const out = await prom;
        const groupStartIndex = out.indexOf("::group::");
        const infoIndex = out.indexOf("some info");
        const failedIndex = out.indexOf("Failed in");
        const groupEndIndex = out.indexOf("::endgroup::");
        expect(groupStartIndex).toBeLessThan(infoIndex);
        expect(infoIndex).toBeLessThan(failedIndex);
        expect(failedIndex).toBeLessThan(groupEndIndex);
      });
    });
  });
});
