import { beforeAll, describe, expect, jest, test } from "@jest/globals";
import * as os from "os";
import * as path from "path";
import { PackageCacheInfo, PackageContentCacheInfo } from "./cache";
import { PackageInfo } from "./info";

const mock = {
  caches: new Map<string, Map<string, any>>(),
  files: new Map<string, any>(),
};

jest.mock("fs", () => ({
  ...jest.requireActual<object>("fs"),
  existsSync(file: string): boolean {
    const roots = [
      path.join("/", "path", "to", "bin"),
      path.join("/", "path", "to", "package"),
    ];
    for (const root of roots) {
      if (file.startsWith(root)) return true;
    }
    return false;
  },
  mkdirSync() {},
}));

jest.mock("@actions/cache", () => ({
  ...jest.requireActual<object>("@actions/cache"),
  async restoreCache(
    paths: string[],
    key: string
  ): Promise<string | undefined> {
    const cache = mock.caches.get(key);
    if (cache === undefined) return undefined;
    for (const path of paths) {
      mock.files.set(path, cache.get(path));
    }
    return key;
  },
  async saveCache(paths: string[], key: string): Promise<number> {
    const cache = new Map<string, any>();
    for (const path of paths) {
      cache.set(path, mock.files.get(path));
    }
    mock.caches.set(key, cache);
    return mock.caches.size;
  },
}));

jest.mock("@actions/io", () => ({
  ...jest.requireActual<object>("@actions/io"),
  async which(tool: string, check: boolean): Promise<string> {
    expect(check).toBe(true);
    return path.join("/", "path", "to", "bin", tool);
  },
}));

jest.mock("jsonfile", () => ({
  ...jest.requireActual<object>("jsonfile"),
  readFileSync(path: string): any {
    return mock.files.get(path);
  },
  writeFileSync(path: string, obj: any): void {
    mock.files.set(path, obj);
  },
}));

jest.mock("./info", () => ({
  ...jest.requireActual<object>("./info"),
  async showPackageInfo(packageName: string): Promise<PackageInfo | undefined> {
    const info = new PackageInfo();
    info.location = path.join("/", "path", "to", "package");
    switch (packageName) {
      case "valid-package":
        info.name = "valid-package";
        info.requires = ["some-dependency", "some-other-dependency"];
        info.files = [
          path.join("..", "..", "bin", "valid-package"),
          path.join("..", "..", "bin", "some-executable"),
          path.join("valid-package", "__init__.py"),
          path.join("valid-package", "some_source.py"),
          path.join("valid-package", "some_other_source.py"),
        ];
        break;

      case "some-dependency":
        info.name = "some-dependency";
        info.requires = ["some-dependency-of-dependency"];
        info.files = [
          path.join("..", "..", "bin", "some-dependency"),
          path.join("some-dependency", "__init__.py"),
          path.join("some-dependency", "some_source.py"),
        ];
        break;

      case "some-dependency-of-dependency":
        info.name = "some-dependency-of-dependency";
        info.files = [
          path.join("some-dependency-of-dependency", "__init__.py"),
        ];
        break;

      case "some-other-dependency":
        info.name = "some-other-dependency";
        info.files = [path.join("some-other-dependency", "__init__.py")];
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
  expect(info.path).toContain(PackageCacheInfo.root());
  expect(info.path).toContain("some-package");
});

describe("accumulates content info of a pip package cache", () => {
  test("with a valid package", async () => {
    const info = new PackageCacheInfo("valid-package");
    const prom = info.accumulateContentInfo();
    await expect(prom).resolves.toBeInstanceOf(PackageContentCacheInfo);
    const content = await prom;
    expect(content.name).toBe("valid-package");
    expect(content.key).toMatch(new RegExp(`${os.type()}.*valid-package`));
    expect(content.key).not.toBe(info.key);
    expect(content.paths).toStrictEqual([
      path.join("/", "path", "to", "bin", "valid-package"),
      path.join("/", "path", "to", "bin", "some-executable"),
      path.join("/", "path", "to", "package", "valid-package"),
      path.join("/", "path", "to", "bin", "some-dependency"),
      path.join("/", "path", "to", "package", "some-dependency"),
      path.join("/", "path", "to", "package", "some-dependency-of-dependency"),
      path.join("/", "path", "to", "package", "some-other-dependency"),
    ]);
  });

  test("with an invalid package", () => {
    const info = new PackageCacheInfo("invalid-package");
    return expect(info.accumulateContentInfo()).rejects.toThrow();
  });
});

describe("saves and restores content info of a pip package cache", () => {
  let info: PackageCacheInfo;
  beforeAll(() => {
    mock.caches.clear();
    mock.files.clear();
    info = new PackageCacheInfo("valid-package");
  });

  test("restores non existent content info", () => {
    const prom = info.restoreContentInfo();
    return expect(prom).resolves.toBeUndefined();
  });

  let content: PackageContentCacheInfo;
  test("accumulates and saves content info", async () => {
    content = await info.accumulateContentInfo();
    const prom = info.saveContentInfo(content);
    return expect(prom).resolves.toBeUndefined();
  });

  test("restores content info", () => {
    mock.files.clear();
    const prom = info.restoreContentInfo();
    return expect(prom).resolves.toStrictEqual(content);
  });
});

describe("saves and restores content of a pip package cache", () => {
  let content: PackageContentCacheInfo;
  beforeAll(async () => {
    mock.caches.clear();
    mock.files.clear();
    const info = new PackageCacheInfo("valid-package");
    content = await info.accumulateContentInfo();
  });

  test("restores non existent content", () => {
    const prom = content.restore();
    return expect(prom).resolves.toBeUndefined();
  });

  test("saves content", async () => {
    const prom = content.save();
    return expect(prom).resolves.toBeUndefined();
  });

  test("restores content", () => {
    mock.files.clear();
    const prom = content.restore();
    return expect(prom).resolves.toStrictEqual(content.key);
  });
});
