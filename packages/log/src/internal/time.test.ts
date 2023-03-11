import { beforeEach, describe, expect, test } from "@jest/globals";
import { Time } from "./time";

describe("gets current time", () => {
  test("should be more than zero", () => {
    expect(Time.now().ms).toBeGreaterThan(0);
  });
});

describe("calculates elapsed time", () => {
  let time: Time;
  beforeEach(async () => (time = Time.now()));
  test("should be more than the timeout", async () => {
    await new Promise((r) => setTimeout(r, 50));
    expect(time.elapsed().ms).toBeGreaterThanOrEqual(50);
  });
  test("new one should be more than the old one", async () => {
    const oldElapsed = time.elapsed();
    await new Promise((r) => setTimeout(r, 50));
    expect(time.elapsed().ms).toBeGreaterThan(oldElapsed.ms);
  });
});
