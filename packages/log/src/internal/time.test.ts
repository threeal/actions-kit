import { expect, jest, test } from "@jest/globals";
import { Time } from "./time";

jest.useFakeTimers();

test("gets current time", () => {
  jest.setSystemTime(1000);
  expect(Time.now().ms).toBe(1000);
});

test("calculates elapsed time", () => {
  jest.setSystemTime(1000);
  const time = Time.now();
  jest.setSystemTime(1500);
  expect(time.elapsed().ms).toBe(500);
});
