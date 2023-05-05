import { afterAll, beforeAll, describe, expect, test } from "@jest/globals";
import * as fs from "fs";
import * as os from "os";
import { PackageCacheInfo, PackageContentCacheInfo } from "./cache";
import { installPackage, uninstallPackage } from "./install";

export const validPkgName = "rsa";

export function packageCacheInfoRemoveRoot() {
  fs.rmSync(PackageCacheInfo.root(), { recursive: true, force: true });
}

function expectValidCacheInfoName(name: string, packageName: string) {
  expect(name).not.toHaveLength(0);
  expect(name.toLowerCase()).toBe(packageName.toLowerCase());
}

function expectValidCacheInfoKey(key: string, packageName: string) {
  expect(key).not.toHaveLength(0);
  expect(key).toMatch(new RegExp(os.type()));
  expect(key).toMatch(new RegExp(packageName));
}

test("creates cache info of a pip package", () => {
  const info = new PackageCacheInfo("some-package");
  expect(info.name).toBe("some-package");
  expect(info.key).toMatch(new RegExp(`${os.type()}.*some-package`));
  expect(info.path).toMatch(
    new RegExp(`${PackageCacheInfo.root()}.*some-package`)
  );
});

describe("test accumulate content info of a pip package cache info", () => {
  describe(`using a valid package (${validPkgName})`, () => {
    const cacheInfo = new PackageCacheInfo(validPkgName);
    beforeAll(async () => {
      await installPackage(cacheInfo.name);
    }, 30000);

    let res: PackageContentCacheInfo;
    test("should be resolved", async () => {
      const prom = cacheInfo.accumulateContentInfo();
      await expect(prom).resolves.toBeInstanceOf(PackageContentCacheInfo);
      res = await prom;
    });

    describe("check the result", () => {
      test("name should be valid", () => {
        expectValidCacheInfoName(res.name, cacheInfo.name);
      });

      test("key should be valid", () => {
        expectValidCacheInfoKey(res.key, cacheInfo.name);
      });

      test("key should be different from cache info's", () => {
        expect(res.key).not.toBe(cacheInfo.key);
      });

      test("paths should be exist", () => {
        expect(res.paths).not.toHaveLength(0);
        for (const path of res.paths) {
          expect(fs.existsSync(path)).toBe(true);
        }
      });
    });

    afterAll(async () => {
      await uninstallPackage(cacheInfo.name);
    }, 30000);
  });

  describe("using an invalid package", () => {
    const cacheInfo = new PackageCacheInfo("some-invalid-package");
    test("should be rejected", async () => {
      const res = cacheInfo.accumulateContentInfo();
      await expect(res).rejects.toThrow();
    });
  });
});
