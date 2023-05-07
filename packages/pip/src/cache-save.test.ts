import { afterAll, beforeAll, describe, expect, test } from "@jest/globals";
import * as fs from "fs";
import { PackageCacheInfo, PackageContentCacheInfo } from "./cache";
import { installPackage, uninstallPackage } from "./install";

const validPkgName = "rsa";

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
