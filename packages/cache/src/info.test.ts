import { expect, test } from "@jest/globals";
import * as path from "path";
import { Info } from "./info";

test("constructs a new cache info object", () => {
  const key = "some-key";
  const paths = [
    path.normalize("/path/to/some-file"),
    path.normalize("/path/to/some-other-file"),
  ];
  const info = new Info(key, paths);
  expect(info.key).toBe(key);
  expect(info.paths).toStrictEqual(paths);
});
