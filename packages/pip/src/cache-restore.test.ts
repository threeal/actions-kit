import { afterAll, beforeAll, describe, expect, test } from "@jest/globals";
import * as fs from "fs";
import { PackageCacheInfo, PackageContentCacheInfo } from "./cache";
import { installPackage, uninstallPackage } from "./install";
import { PackageInfo, showPackageInfo } from "./info";

const validPkgName = "rsa";

describe("test restore cache of a pip package content", () => {
  describe(`using a valid package (${validPkgName})`, () => {
    const cacheInfo = new PackageCacheInfo(validPkgName);
    let contentInfo: PackageContentCacheInfo;
    beforeAll(async () => {
      await installPackage(cacheInfo.name);
      contentInfo = await cacheInfo.accumulateContentInfo();
      await contentInfo.save();
      await uninstallPackage(cacheInfo.name);
      // TODO: automatically uninstall dependencies
      await uninstallPackage("pyasn1");
    }, 30000);

    describe("check the package", () => {
      test("should not be installed", async () => {
        const prom = showPackageInfo(cacheInfo.name);
        await expect(prom).resolves.toBeUndefined();
      });
      test("files should not be exist", () => {
        for (const path of contentInfo.paths) {
          expect(fs.existsSync(path)).toBe(false);
        }
      });
    });

    describe("restore the cache", () => {
      test("should be resolved", async () => {
        const prom = contentInfo.restore();
        await expect(prom).resolves.not.toBeUndefined();
      });
    });

    describe("check again the package", () => {
      test("should be installed", async () => {
        const prom = showPackageInfo(cacheInfo.name);
        await expect(prom).resolves.toBeInstanceOf(PackageInfo);
      });
      test("files should be exist", () => {
        for (const path of contentInfo.paths) {
          expect(fs.existsSync(path)).toBe(true);
        }
      });
    });

    afterAll(async () => {
      await uninstallPackage(cacheInfo.name);
    }, 30000);
  });
});
