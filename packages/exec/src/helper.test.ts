import { beforeAll, describe, expect, test } from "@jest/globals";
import { OutputResult, outputSilently } from "./output";

export function testOutputSilent(script: string, shouldBeSilent: boolean) {
  describe("runs in a separate process", () => {
    let prom: Promise<OutputResult>;
    test("should be resolved", () => {
      const importScript = "const exec = require('./packages/exec/lib');\n";
      prom = outputSilently("node", "-e", importScript + script);
      return expect(prom).resolves.toBeTruthy();
    });
    describe("checks the output", () => {
      let res: OutputResult;
      beforeAll(async () => (res = await prom));
      if (shouldBeSilent) {
        test("output should be empty", () => {
          expect(res.output.length).toBe(0);
        });
      } else {
        test("output should not be empty", () => {
          expect(res.output.length).toBeGreaterThan(0);
        });
      }
    });
  });
}
