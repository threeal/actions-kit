import { beforeAll, describe, expect, jest, test } from "@jest/globals";
import * as os from "os";
import { PackageCacheInfo, PackageContentCacheInfo } from "./cache";
import { PackageInfo } from "./info";

jest.mock("fs", () => ({
  ...jest.requireActual<object>("fs"),
  existsSync: () => true,
}));

const caches = new Map<string, Map<string, any>>();
jest.mock("@actions/cache", () => ({
  ...jest.requireActual<object>("@actions/cache"),
  async restoreCache(
    paths: string[],
    key: string
  ): Promise<string | undefined> {
    const cacheFiles = caches.get(key);
    if (cacheFiles === undefined) return undefined;
    for (const path of paths) {
      files.set(path, cacheFiles.get(path));
    }
    return key;
  },
  async saveCache(paths: string[], key: string): Promise<number> {
    const cacheFiles = new Map<string, any>();
    for (const path of paths) {
      cacheFiles.set(path, files.get(path));
    }
    caches.set(key, cacheFiles);
    return caches.size;
  },
}));

jest.mock("@actions/io", () => ({
  ...jest.requireActual<object>("@actions/io"),
  which: async (tool: string, check: boolean): Promise<string> => {
    expect(check).toBe(true);
    return `/path/to/bin/${tool}`;
  },
}));

const files = new Map<string, any>();
jest.mock("jsonfile", () => ({
  ...jest.requireActual<object>("jsonfile"),
  readFileSync(path: string): any {
    return files.get(path);
  },
  writeFileSync(path: string, obj: any): void {
    files.set(path, obj);
  },
}));

jest.mock("./info", () => ({
  ...jest.requireActual<object>("./info"),
  showPackageInfo: async (
    packageName: string
  ): Promise<PackageInfo | undefined> => {
    const info = new PackageInfo();
    info.location = "/path/to/package";
    switch (packageName) {
      case "valid-package":
        info.name = "valid-package";
        info.requires = ["some-dependency", "some-other-dependency"];
        info.files = [
          "../../bin/valid-package",
          "../../bin/some-executable",
          "valid-package/__init__.py",
          "valid-package/some_source.py",
          "valid-package/some_other_source.py",
        ];
        break;

      case "some-dependency":
        info.name = "some-dependency";
        info.requires = ["some-dependency-of-dependency"];
        info.files = [
          "../../bin/some-dependency",
          "some-dependency/__init__.py",
          "some-dependency/some_source.py",
        ];
        break;

      case "some-dependency-of-dependency":
        info.name = "some-dependency-of-dependency";
        info.requires = [];
        info.files = ["some-dependency-of-dependency/__init__.py"];
        break;

      case "some-other-dependency":
        info.name = "some-other-dependency";
        info.requires = [];
        info.files = ["some-other-dependency/__init__.py"];
        break;

      default:
        return undefined;
    }
    return info;
  },
}));

test("creates cache info of a pip package", () => {
  const info = new PackageCacheInfo("some-package");
  expect(info.name).toBe("some-package");
  expect(info.key).toMatch(new RegExp(`${os.type()}.*some-package`));
  expect(info.path).toMatch(
    new RegExp(`${PackageCacheInfo.root()}.*some-package`)
  );
});

describe("accumulates content info of a pip package cache info", () => {
  test("with a valid package", async () => {
    const info = new PackageCacheInfo("valid-package");
    const prom = info.accumulateContentInfo();
    await expect(prom).resolves.toBeInstanceOf(PackageContentCacheInfo);
    const content = await prom;
    expect(content.name).toBe("valid-package");
    expect(content.key).toMatch(new RegExp(`${os.type()}.*valid-package`));
    expect(content.key).not.toBe(info.key);
    expect(content.paths).toStrictEqual([
      "/path/to/bin/valid-package",
      "/path/to/bin/some-executable",
      "/path/to/package/valid-package",
      "/path/to/bin/some-dependency",
      "/path/to/package/some-dependency",
      "/path/to/package/some-dependency-of-dependency",
      "/path/to/package/some-other-dependency",
    ]);
  });

  test("with an invalid package", () => {
    const info = new PackageCacheInfo("invalid-package");
    return expect(info.accumulateContentInfo()).rejects.toThrow();
  });
});

describe("saves and restores content info of a pip package cache info", () => {
  beforeAll(() => {
    caches.clear();
    files.clear();
  });

  let info: PackageCacheInfo;
  test("creates cache info of a pip package", () => {
    info = new PackageCacheInfo("valid-package");
  });

  let content: PackageContentCacheInfo;
  test("accumulates content info of a cache info", async () => {
    content = await info.accumulateContentInfo();
  });

  test("saves content info", () => {
    const prom = info.saveContentInfo(content);
    return expect(prom).resolves.toBeUndefined();
  });

  test("restores content info", () => {
    files.clear();
    const prom = info.restoreContentInfo();
    return expect(prom).resolves.toStrictEqual(content);
  });
});
