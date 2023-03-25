import { beforeAll, describe, expect, test } from "@jest/globals";
import { Result } from "./result";

export interface TestExecParams {
  title: string;
  successExec: () => Promise<Result>;
  failExec: () => Promise<Result>;
}

export function testExec(params: TestExecParams) {
  describe(params.title, () => {
    describe("on a successful command", () => {
      let prom: Promise<Result>;
      test("should be resolved", () => {
        prom = params.successExec();
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
        prom = params.failExec();
        return expect(prom).resolves.toBeTruthy();
      });
      describe("checks the result", () => {
        let res: Result;
        beforeAll(async () => (res = await prom));
        test("the status should not be ok", () => {
          expect(res.isOk()).toBe(false);
        });
      });
    });
  });
}
