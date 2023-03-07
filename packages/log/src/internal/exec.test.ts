import { beforeAll, describe, expect, test } from "@jest/globals";
import * as exec from "@actions/exec";

export async function nodeExec(code: string): Promise<string> {
  let out: string = "";
  await exec.exec("node", ["-e", code], {
    listeners: {
      stdout: (data: Buffer) => {
        out += data.toString();
      },
    },
  });
  return out;
}

describe("test node code execution", () => {
  let prom: Promise<string>;
  beforeAll(() => {
    prom = nodeExec("console.log('some log');");
  });
  test("output should be correct", async () => {
    await expect(prom).resolves.toBe("some log\n");
  });
});
