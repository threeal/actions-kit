import { describe, expect, test } from "@jest/globals";
import { emph } from "./emph";

describe("emphasizes message", () => {
  test("message should be written", () => {
    expect(emph("some message")).toMatch(/some message/);
  });
});
