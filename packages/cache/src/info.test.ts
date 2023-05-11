import {
  afterAll,
  beforeAll,
  describe,
  expect,
  jest,
  test,
} from "@jest/globals";
import * as path from "path";
import { Entry, copyEntry } from "./helper.test";
import { Info } from "./info";

class Mock {
  static caches: Map<string, Entry> = new Map();
  static root: Entry = {};
}

jest.mock("./cache", () => ({
  ...jest.requireActual<object>("./cache"),
  async save(key: string, paths: string[]) {
    let root: Entry = {};
    for (const fullPath of paths) {
      root = copyEntry(Mock.root, root, fullPath.split(path.sep));
    }
    Mock.caches.set(key, root);
  },
  async restore(key: string, paths: string[]): Promise<boolean> {
    const root = Mock.caches.get(key);
    if (root === undefined) return false;
    for (const fullPath of paths) {
      Mock.root = copyEntry(root, Mock.root, fullPath.split(path.sep));
    }
    return true;
  },
}));

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

describe("saves and restores cache using a cache info object", () => {
  let info: Info;
  beforeAll(() => {
    Mock.caches.clear();
    Mock.root = {
      path: {
        to: {
          "some-file.ext": {},
          "some-other-file.ext": {},
          "some-excluded-file": {},
          "some-directory": {
            "of-some-file.ext": {},
            "of-some-other-file.ext": {},
          },
        },
      },
    };
    info = new Info("some-key", [
      path.normalize("path/to/*.ext"),
      path.normalize("path/to/some-directory"),
    ]);
  });

  test("restores nonexistent cache", () => {
    const prom = info.restore();
    return expect(prom).resolves.toBe(false);
  });

  test("saves cache", () => {
    const prom = info.save();
    return expect(prom).resolves.toBeUndefined();
  });

  test("clears files", () => {
    Mock.root = {};
  });

  test("restores cache", () => {
    const prom = info.restore();
    return expect(prom).resolves.toBe(true);
  });

  test("checks files", () => {
    expect(Mock.root).toStrictEqual({
      path: {
        to: {
          "some-file.ext": {},
          "some-other-file.ext": {},
          "some-directory": {
            "of-some-file.ext": {},
            "of-some-other-file.ext": {},
          },
        },
      },
    });
  });

  afterAll(() => {
    Mock.caches.clear();
    Mock.root = {};
  });
});