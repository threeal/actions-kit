import { afterAll, beforeAll, describe, expect, test } from "@jest/globals";
import * as fs from "fs";
import { PackageCacheInfo, PackageContentCacheInfo } from "./cache";
import { installPackage, uninstallPackage } from "./install";

export const validPkgName = "rsa";

export function packageCacheInfoRemoveRoot() {
  fs.rmSync(PackageCacheInfo.root(), { recursive: true, force: true });
}

describe("test save cache of a pip package content info", () => {
  describe(`using a valid package (${validPkgName})`, () => {
    const cacheInfo = new PackageCacheInfo(validPkgName);
    let contentInfo: PackageContentCacheInfo;
    beforeAll(async () => {
      await installPackage(cacheInfo.name);
      contentInfo = await cacheInfo.accumulateContentInfo();
      packageCacheInfoRemoveRoot();
    }, 30000);

    describe("check the cache", () => {
      test("content info file should not be exist", () => {
        expect(fs.existsSync(cacheInfo.path)).toBe(false);
      });
    });

    describe("save the cache", () => {
      test("should be resolved", async () => {
        const prom = cacheInfo.saveContentInfo(contentInfo);
        await expect(prom).resolves.toBeUndefined();
      });
    });

    describe("check again the cache", () => {
      test("content info file should be exist", () => {
        expect(fs.existsSync(cacheInfo.path)).toBe(true);
      });
    });

    afterAll(async () => {
      await uninstallPackage(cacheInfo.name);
      packageCacheInfoRemoveRoot();
    }, 30000);
  });
});

describe("test save cache of a pip package content", () => {
  describe(`using a valid package (${validPkgName})`, () => {
    const cacheInfo = new PackageCacheInfo(validPkgName);
    let contentInfo: PackageContentCacheInfo;
    beforeAll(async () => {
      await installPackage(cacheInfo.name);
      contentInfo = await cacheInfo.accumulateContentInfo();
      await cacheInfo.saveContentInfo(contentInfo);
    }, 30000);

    describe("check the package", () => {
      test("files should be exist", () => {
        for (const path of contentInfo.paths) {
          expect(fs.existsSync(path)).toBe(true);
        }
      });
    });

    describe("save the cache", () => {
      test("should be resolved", async () => {
        const prom = contentInfo.save();
        await expect(prom).resolves.toBeUndefined();
      });
    });

    describe("check the cache", () => {
      test("should be saved", async () => {
        const prom = contentInfo.restore();
        await expect(prom).resolves.not.toBeUndefined();
      });
    });

    afterAll(async () => {
      await uninstallPackage(cacheInfo.name);
    }, 30000);
  });
});
