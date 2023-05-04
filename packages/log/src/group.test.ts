import { describe, expect, jest, test } from "@jest/globals";
import { group } from "./group";
import { info } from "./log";

const out: string[] = [];

jest.mock("@actions/core", () => ({
  ...jest.requireActual<object>("@actions/core"),
  startGroup: (name: string) => {
    out.push(`START ${name}`);
  },
  endGroup: () => {
    out.push("END");
  },
}));

jest.mock("./log", () => ({
  ...jest.requireActual<object>("./log"),
  info: (message: string) => {
    out.push(message);
  },
}));

describe("group output of an async function", () => {
  test("on a successful function", async () => {
    const prom = group("some group", async () => {
      info("some info message");
      return true;
    });
    await expect(prom).resolves.toBe(true);
    expect(out).toContain("START some group");
    expect(out).toContain("some info message");
    expect(out).toContain("END");
  });

  test("on a failed function", async () => {
    const prom = group("some group", async () => {
      info("some info message");
      throw new Error("some error");
    });
    await expect(prom).rejects.toThrow();
    expect(out).toContain("START some group");
    expect(out).toContain("some info message");
    expect(out).toContain("END");
  });
});
