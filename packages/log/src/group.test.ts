import { beforeAll, describe, expect, test } from "@jest/globals";
import { group } from "./group";
import { info } from "./log";
import { flushStdout, stdout } from "./internal/stdout.test";

describe("test output grouping of an async function", () => {
  let res = false;
  beforeAll(async () => {
    flushStdout();
    res = await group("some group", async () => {
      info("some info");
      return true;
    });
  });
  test("group name should be written", () => {
    expect(stdout()).toMatch(/some group/);
  });
  test("output order should be correct", () => {
    const groupStartIndex = stdout().indexOf("GROUP_START");
    const infoIndex = stdout().indexOf("some info");
    const groupEndIndex = stdout().indexOf("GROUP_END");
    expect(groupStartIndex).toBeLessThan(infoIndex);
    expect(infoIndex).toBeLessThan(groupEndIndex);
  });
  test("should return a value", () => {
    expect(res).toBe(true);
  });
});
