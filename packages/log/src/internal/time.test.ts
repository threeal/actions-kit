import { describe, expect, test } from "@jest/globals";
import { Time } from "./time";

describe("test getting current time", () => {
  test("should be more than zero", () => {
    expect(Time.now().ms).toBeGreaterThan(0);
  });
});

describe("test calculate elapsed time", () => {
  test("should be more than the timeout", async () => {
    const time = Time.now();
    await new Promise((r) => setTimeout(r, 50));
    expect(time.elapsed().ms).toBeGreaterThanOrEqual(50);
  });
  test("new one should be more than the old one", async () => {
    const time = Time.now();
    await new Promise((r) => setTimeout(r, 50));
    const prevElapsed = time.elapsed();
    await new Promise((r) => setTimeout(r, 50));
    expect(time.elapsed().ms).toBeGreaterThan(prevElapsed.ms);
  });
});
