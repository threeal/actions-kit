import { describe, expect, test } from "@jest/globals";
import { Duration } from "./duration";

function sec(val: number): number {
  return val * 1000;
}

function min(val: number): number {
  return val * sec(60);
}

function hour(val: number): number {
  return val * min(60);
}

describe("test print duration", () => {
  test("should print in milliseconds", () => {
    expect(`${new Duration(125)}`).toBe("125ms");
    expect(`${new Duration(125.25)}`).toBe("125ms");
  });
  test("should print in seconds", () => {
    expect(`${new Duration(sec(15))}`).toBe("15s");
  });
  test("should print in seconds and milliseconds", () => {
    expect(`${new Duration(sec(25) + 250)}`).toBe("25s 250ms");
  });
  test("should print in minutes", () => {
    expect(`${new Duration(min(5))}`).toBe("5m");
  });
  test("should print in minutes and seconds", () => {
    expect(`${new Duration(min(15) + sec(25))}`).toBe("15m 25s");
    expect(`${new Duration(min(15) + sec(25) + 125)}`).toBe("15m 25s");
  });
  test("should print in hours", () => {
    expect(`${new Duration(hour(1))}`).toBe("1h");
  });
  test("should print in hours and minutes", () => {
    expect(`${new Duration(hour(3) + min(15))}`).toBe("3h 15m");
    expect(`${new Duration(hour(3) + min(15) + sec(25))}`).toBe("3h 15m");
    expect(`${new Duration(hour(3) + min(15) + sec(25) + 125)}`).toBe("3h 15m");
  });
});
