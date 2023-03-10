import * as exec from "@actions-kit/exec";
import { beforeAll, describe, expect, test } from "@jest/globals";
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

    describe("runs in a separate process", () => {
      let prom: Promise<exec.Result>;
      test("should be resolved", () => {
        const code = [
          "const log = require('./packages/log/lib');",
          "log.group('some group', async () => {",
          "  log.info('some info');",
          "  return true;",
          "});",
        ].join("\n");
        prom = exec.execOut("node", "-e", code);
        return expect(prom).resolves.toBeTruthy();
      });
      describe("checks output", () => {
        let res: exec.Result;
        beforeAll(async () => (res = await prom));
        test("group name should be written", () => {
          expect(res.output).toMatch(/some group/);
        });
        test("success info should be written", () => {
          expect(res.output).toMatch(/Done in \d*(ms|s|m|h)( \d*(ms|s|m))?/);
        });
        test("output order should be correct", () => {
          const groupStartIndex = res.output.indexOf("::group::");
          const infoIndex = res.output.indexOf("some info");
          const doneIndex = res.output.indexOf("Done in");
          const groupEndIndex = res.output.indexOf("::endgroup::");
          expect(groupStartIndex).toBeLessThan(infoIndex);
          expect(infoIndex).toBeLessThan(doneIndex);
          expect(doneIndex).toBeLessThan(groupEndIndex);
        });
      });
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

    describe("runs in a separate process", () => {
      let prom: Promise<exec.Result>;
      test("should be resolved", () => {
        const code = [
          "const log = require('./packages/log/lib');",
          "log.group('some group', async () => {",
          "  log.info('some info');",
          "  throw new Error('some error');",
          "}).catch((err) => {});",
        ].join("\n");
        prom = exec.execOut("node", "-e", code);
        return expect(prom).resolves.toBeTruthy();
      });
      describe("checks output", () => {
        let res: exec.Result;
        beforeAll(async () => (res = await prom));
        test("group name should be written", () => {
          expect(res.output).toMatch(/some group/);
        });
        test("failure info should be written", () => {
          expect(res.output).toMatch(/Failed in \d*(ms|s|m|h)( \d*(ms|s|m))?/);
        });
        test("output order should be correct", () => {
          const groupStartIndex = res.output.indexOf("::group::");
          const infoIndex = res.output.indexOf("some info");
          const failedIndex = res.output.indexOf("Failed in");
          const groupEndIndex = res.output.indexOf("::endgroup::");
          expect(groupStartIndex).toBeLessThan(infoIndex);
          expect(infoIndex).toBeLessThan(failedIndex);
          expect(failedIndex).toBeLessThan(groupEndIndex);
        });
      });
    });
  });
});
