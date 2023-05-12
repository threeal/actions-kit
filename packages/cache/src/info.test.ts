import {
  afterAll,
  beforeAll,
  describe,
  expect,
  jest,
  test,
} from "@jest/globals";
import * as path from "path";
import { copyRoot, Directory, File } from "./helper.test";
import { Info, restoreInfo, saveInfo } from "./info";

class Mock {
  static caches = new Map<string, Directory>();
  static root = new Directory();
}

jest.mock("fs", () => ({
  ...jest.requireActual<object>("fs"),
  existsSync(): boolean {
    return false;
  },
  mkdirSync() {},
}));

jest.mock("jsonfile", () => ({
  ...jest.requireActual<object>("jsonfile"),
  writeFileSync(file: string, obj: any) {
    const str = JSON.stringify(obj);
    Mock.root.write(str, file);
  },
  readFileSync(file: string): any {
    const str = Mock.root.read(file);
    return str === undefined ? undefined : JSON.parse(str);
  },
}));

jest.mock("os", () => ({
  ...jest.requireActual<object>("os"),
  homedir(): string {
    return "home";
  },
}));

jest.mock("./cache", () => ({
  ...jest.requireActual<object>("./cache"),
  async save(key: string, paths: string[]) {
    const root = new Directory();
    for (const fullPath of paths) {
      copyRoot(Mock.root, root, fullPath);
    }
    Mock.caches.set(key, root);
  },
  async restore(key: string, paths: string[]): Promise<boolean> {
    const root = Mock.caches.get(key);
    if (root === undefined) return false;
    for (const fullPath of paths) {
      copyRoot(root, Mock.root, fullPath);
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
    Mock.root = new Directory({
      path: new Directory({
        to: new Directory({
          "some-file.ext": new File("some content"),
          "some-other-file.ext": new File("some other content"),
          "some-excluded-file": new File("some other content"),
          "some-directory": new Directory({
            "of-some-file.ext": new File("some content"),
            "of-some-other-file.ext": new File("some other content"),
          }),
        }),
      }),
    });
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
    Mock.root.children.clear();
  });

  test("restores cache", () => {
    const prom = info.restore();
    return expect(prom).resolves.toBe(true);
  });

  test("checks files", () => {
    expect(Mock.root).toStrictEqual(
      new Directory({
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
      })
    );
  });

  afterAll(() => {
    Mock.caches.clear();
    Mock.root.children.clear();
  });
});

describe("saves and restores cache of a cache info object", () => {
  let info: Info;
  beforeAll(() => {
    Mock.caches.clear();
    Mock.root.children.clear();
    info = new Info("some-key", [
      path.normalize("path/to/*.ext"),
      path.normalize("path/to/some-directory"),
    ]);
  });

  test("restores nonexistent cache", () => {
    const prom = restoreInfo("some-info-key");
    return expect(prom).resolves.toBeUndefined();
  });

  test("saves cache", () => {
    const prom = saveInfo("some-info-key", info);
    return expect(prom).resolves.toBeUndefined();
  });

  test("clears files", () => {
    Mock.root.children.clear();
  });

  test("restores cache", () => {
    const prom = restoreInfo("some-info-key");
    return expect(prom).resolves.toStrictEqual(info);
  });

  afterAll(() => {
    Mock.caches.clear();
    Mock.root.children.clear();
  });
});
