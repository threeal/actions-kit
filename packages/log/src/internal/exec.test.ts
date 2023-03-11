import { describe, expect, test } from "@jest/globals";
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

describe("executes node code", () => {
  test("should be resolved with correct output", () => {
    const prom = nodeExec("console.log('some log');");
    return expect(prom).resolves.toBe("some log\n");
  });
});
