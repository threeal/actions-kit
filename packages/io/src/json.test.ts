import { describe, expect as jestExpect, test } from "@jest/globals";
import * as fs from "fs";
import * as tmp from "tmp";
import { readJsonFile, writeJsonFile } from "./json";

const expect = Object.assign(jestExpect);
expect.extend({
  toBeExist(received: string) {
    if (fs.existsSync(received)) {
      return {
        message: () => `expected path '${received}' not to be exist`,
        pass: true,
      };
    }
    return {
      message: () => `expected path '${received}' to be exist`,
      pass: false,
    };
  }
});

describe("test write and read JSON", () => {
  describe("using JSON object", () => {
    const path = tmp.tmpNameSync();
    const obj = {
      name: "John Doe",
      age: 27,
    };

    describe("write to a file", () => {
      test("should not error", () => writeJsonFile(path, obj));
    });

    describe("check the file", () => {
      test("should be exist", () => expect(path).toBeExist());
    });

    let readObj = {};
    describe("read from the file", () => {
      test("should not error", () => {
        readObj = readJsonFile(path);
      });
    });

    describe("compare the result", () => {
      test("should be equal", () => expect(obj).toEqual(readObj));
    });
  });
});
