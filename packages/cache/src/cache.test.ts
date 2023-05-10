import {
  afterAll,
  beforeAll,
  describe,
  expect,
  jest,
  test,
} from "@jest/globals";
import * as path from "path";
import { restore, save } from "./cache";

interface Dictionary<T> {
  [key: string]: T;
}

interface Entry extends Dictionary<Entry> {}

function copyEntry(src: Entry, dst: Entry, fullPath: string) {
  const names = fullPath.split(path.sep);
  for (let i = 0; i < names.length; ++i) {
    const name = names[i];
    if (src[name] === undefined) return;
    if (dst[name] === undefined) {
      dst[name] = i === names.length - 1 ? src[name] : {};
    }
    src = src[name];
    dst = dst[name];
  }
}

class Mock {
  static caches: Map<string, Entry> = new Map();
  static root: Entry = {};
}

jest.mock("@actions/cache", () => ({
  async saveCache(paths: string[], key: string): Promise<number> {
    const root: Entry = {};
    for (const fullPath of paths) {
      copyEntry(Mock.root, root, fullPath);
    }
    Mock.caches.set(key, root);
    return 0;
  },
  async restoreCache(
    paths: string[],
    primaryKey: string
  ): Promise<string | undefined> {
    const root = Mock.caches.get(primaryKey);
    if (root === undefined) return undefined;
    for (const fullPath of paths) {
      copyEntry(root, Mock.root, fullPath);
    }
    return primaryKey;
  },
}));

describe("saves and restores cache", () => {
  beforeAll(() => {
    Mock.caches.clear();
    Mock.root = {
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
    };
  });

  test("restores nonexistent cache", () => {
    const prom = restore("some-key", [path.join("path", "to")]);
    return expect(prom).resolves.toBe(false);
  });

  test("saves cache", () => {
    const prom = save("some-key", [
      path.join("path", "to", "some-file.ext"),
      path.join("path", "to", "some-other-file.ext"),
      path.join("path", "to", "some-directory", "of-some-file.ext"),
    ]);
    return expect(prom).resolves.toBeUndefined();
  });

  test("clear files", () => {
    Mock.root = {};
  });

  test("restores cache", () => {
    const prom = restore("some-key", [
      path.join("path", "to", "some-file.ext"),
      path.join("path", "to", "some-directory"),
    ]);
    return expect(prom).resolves.toBe(true);
  });

  test("check files", () => {
    expect(Mock.root).toStrictEqual({
      path: {
        to: {
          "some-file.ext": {},
          "some-directory": {
            "of-some-file.ext": {},
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
