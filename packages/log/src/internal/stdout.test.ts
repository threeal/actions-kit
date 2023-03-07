import { beforeAll, describe, expect, test } from "@jest/globals";
import { exec } from "child_process";

export async function nodeExec(code: string): Promise<string> {
  return new Promise((resolve, reject) => {
    exec(`node -e "${code}"`, (error, out) => {
      if (error) {
        return reject(error);
      }
      process.stdout.write(`code:\n${code}\noutput:\n${out}\n`);
      resolve(out);
    });
  });
}

describe("test node code execution", () => {
  let prom: Promise<string>;
  beforeAll(() => {
    prom = nodeExec("console.log('some log');");
  });
  test("output should be correct", () => {
    expect(prom).resolves.toBe("some log\n");
  });
});
