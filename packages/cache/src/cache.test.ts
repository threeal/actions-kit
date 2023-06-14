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
import { copyRoot, Directory, File } from "./helper.test";

class Mock {
  static caches = new Map<string, Directory>();
  static root = new Directory();
}

jest.mock("@actions/cache", () => ({
  ...jest.requireActual<object>("@actions/cache"),
  async saveCache(paths: string[], key: string): Promise<number> {
    const root = new Directory();
    for (const fullPath of paths) {
      copyRoot(Mock.root, root, fullPath);
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
      copyRoot(root, Mock.root, fullPath);
    }
    return primaryKey;
  },
}));

describe("saves and restores cache", () => {
  beforeAll(() => {
    Mock.caches.clear();
    Mock.root = new Directory({
      path: new Directory({
        to: new Directory({
          "some-file.ext": new File("some content"),
          "some-other-file.ext": new File("some other content"),
          "some-directory": new Directory({
            "of-some-file.ext": new File("some content"),
            "of-some-other-file.ext": new File("some other content"),
          }),
        }),
      }),
    });
  });

  test("restores nonexistent cache", () => {
    const prom = restore("some-key", [path.join("path", "to")]);
    return expect(prom).resolves.toBe(false);
  });

  test("saves cache", () => {
    const prom = save("some-key", [
      path.join("path", "to", "*.ext"),
      path.join("path", "to", "some-directory", "of-some-file.ext"),
    ]);
    return expect(prom).resolves.toBeUndefined();
  });

  test("checks cache", () => {
    const cache = Mock.caches.get("some-key");
    expect(cache).toStrictEqual(
      new Directory({
        path: new Directory({
          to: new Directory({
            "some-file.ext": new File("some content"),
            "some-other-file.ext": new File("some other content"),
            "some-directory": new Directory({
              "of-some-file.ext": new File("some content"),
            }),
          }),
        }),
      })
    );
  });

  test("clears files", () => {
    Mock.root.children.clear();
  });

  test("restores cache", () => {
    const prom = restore("some-key", [
      path.join("path", "to", "some-file.ext"),
      path.join("path", "to", "some-directory"),
    ]);
    return expect(prom).resolves.toBe(true);
  });

  test("checks files", () => {
    expect(Mock.root).toStrictEqual(
      new Directory({
        path: new Directory({
          to: new Directory({
            "some-file.ext": new File("some content"),
            "some-directory": new Directory({
              "of-some-file.ext": new File("some content"),
            }),
          }),
        }),
      })
    );
  });

  afterAll(() => {
    Mock.caches.clear();
    Mock.root.children.clear();
  });
});
