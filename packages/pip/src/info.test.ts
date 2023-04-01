import * as exec from "@actions-kit/exec";
import { afterAll, beforeAll, describe, expect, test } from "@jest/globals";
import * as fs from "fs";
import { PackageInfo, showPackageInfo } from "./info";
import { installPackage, uninstallPackage } from "./install";

const validPkgName = "rsa";

const node = new exec.Command("node", "-e");

describe("test show info of a pip package", () => {
  describe(`show info of a valid package (${validPkgName})`, () => {
    beforeAll(async () => {
      await installPackage(validPkgName);
    }, 30000);

    let pkgInfo: PackageInfo;
    test("should be valid", async () => {
      const res = showPackageInfo(validPkgName);
      await expect(res).resolves.toBeInstanceOf(PackageInfo);
      pkgInfo = (await res) as PackageInfo;
    });

    describe("check contents of the package info", () => {
      test("name should be valid", () => {
        expect(pkgInfo.name).toBe(validPkgName);
      });
      test("version should be valid", () => {
        expect(pkgInfo.version).toMatch(/^(\d+\.)?(\d+\.)?(\*|\d+)$/);
      });
      test("location should be exist", () => {
        expect(fs.existsSync(pkgInfo.location)).toBe(true);
      });

      test("dependencies should be valid", () => {
        expect(pkgInfo.requires).toHaveLength(1);
      });

      test("files should be valid", () => {
        expect(pkgInfo.files.length).toBeGreaterThan(0);
      });

      test("directories should be exist", () => {
        const dirs = pkgInfo.directories();
        expect(dirs).toHaveLength(2);
        for (const dir of dirs) {
          expect(fs.existsSync(dir)).toBe(true);
        }
      });

      test("executables should be exist", async () => {
        const executables = await pkgInfo.executables();
        expect(executables).toHaveLength(6);
        for (const executable of executables) {
          expect(fs.existsSync(executable)).toBe(true);
        }
      });
    });

    describe("runs in a separate process", () => {
      let prom: Promise<exec.OutputResult>;
      test("should be resolved", () => {
        prom = node.outputSilently(
          `const pip = require('./packages/pip/lib');\n\
          pip.showPackageInfo('${validPkgName}');`
        );
        return expect(prom).resolves.toBeTruthy();
      });
      describe("checks output", () => {
        let res: exec.OutputResult;
        beforeAll(async () => (res = await prom));
        test("output should be empty", () => {
          expect(res.output.length).toBe(0);
        });
      });
    });

    afterAll(async () => {
      await uninstallPackage(validPkgName);
    }, 30000);
  });

  describe("show info of an invalid package", () => {
    test("should be undefined", async () => {
      const pkgInfo = showPackageInfo("an-invalid-package");
      await expect(pkgInfo).resolves.toBeUndefined();
    });
  });
});
