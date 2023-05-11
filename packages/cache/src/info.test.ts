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
import { Info, restoreInfo, saveInfo } from "./info";

class Mock {
  static caches: Map<string, Entry> = new Map();
  static root: Entry = {};
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
    const names = file.split(path.sep).reverse();
    let entry: Entry = {};
    let once = true;
    for (const name of names) {
      if (once) {
        once = false;
        entry[name] = JSON.stringify(obj);
      } else {
        entry = { [name]: entry };
      }
    }
    Mock.root = copyEntry(entry, Mock.root, names.reverse());
  },
  readFileSync(file: string): any {
    const names = file.split(path.sep);
    let entry = Mock.root;
    for (const name of names) {
      const subEntry = entry[name];
      if (subEntry === undefined) break;
      if (typeof subEntry == "string") {
        return JSON.parse(subEntry);
      } else {
        entry = subEntry;
      }
    }
    return undefined;
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
          "some-file.ext": "some content",
          "some-other-file.ext": "some other content",
          "some-excluded-file": "some other content",
          "some-directory": {
            "of-some-file.ext": "some content",
            "of-some-other-file.ext": "some other content",
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
          "some-file.ext": "some content",
          "some-other-file.ext": "some other content",
          "some-directory": {
            "of-some-file.ext": "some content",
            "of-some-other-file.ext": "some other content",
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

describe("saves and restores cache of a cache info object", () => {
  let info: Info;
  beforeAll(() => {
    Mock.caches.clear();
    Mock.root = {};
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
    Mock.root = {};
  });

  test("restores cache", () => {
    const prom = restoreInfo("some-info-key");
    return expect(prom).resolves.toStrictEqual(info);
  });

  afterAll(() => {
    Mock.caches.clear();
    Mock.root = {};
  });
});
