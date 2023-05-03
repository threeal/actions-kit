import { expect, test } from "@jest/globals";
import { emph } from "./emph";

test("emphasizes message", () => {
  expect(emph("some message")).toMatch(/.+some message.+/);
});
