import { describe, expect, jest, test } from "@jest/globals";
import { Time } from "./time";

describe("gets current time", () => {
  test("should be more than zero", () => {
    expect(Time.now().ms).toBeGreaterThan(0);
  });
});

test("calculates elapsed time", () => {
  jest.useFakeTimers();
  jest.setSystemTime(1000);
  const time = Time.now();
  jest.setSystemTime(1500);
  expect(time.elapsed().ms).toBe(500);
});
