import { afterAll, beforeAll, describe, expect, test } from "@jest/globals";
import { PackageInfo, showPackageInfo } from "./info";
import { installPackage, uninstallPackage } from "./install";

const validPkgName = "rsa";

describe("test install a pip package", () => {
  describe(`install a valid package (${validPkgName})`, () => {
    beforeAll(async () => {
      await uninstallPackage(validPkgName);
    }, 30000);

    const testInstallPackage = async () => {
      const res = installPackage(validPkgName);
      await expect(res).resolves.toBeUndefined();
    };

    const testShowPackageInfo = async () => {
      const res = showPackageInfo(validPkgName);
      await expect(res).resolves.toBeInstanceOf(PackageInfo);
    };

    test("should be resolved", testInstallPackage, 30000);

    describe("show the package info", () => {
      test("should be valid", testShowPackageInfo);
    });

    describe("install the package again", () => {
      test("should be resolved", testInstallPackage, 30000);
    });

    describe("show the package info again", () => {
      test("should be valid", testShowPackageInfo);
    });

    afterAll(async () => {
      await uninstallPackage(validPkgName);
    }, 30000);
  });

  describe("install an invalid package", () => {
    test("should be rejected", async () => {
      const res = installPackage("an-invalid-package");
      await expect(res).rejects.toThrow();
    }, 30000);
  });
});

describe("test uninstall a pip package", () => {
  describe(`uninstall a valid package (${validPkgName})`, () => {
    beforeAll(async () => {
      await installPackage(validPkgName);
    }, 30000);

    const testUninstallPackage = async () => {
      const res = uninstallPackage(validPkgName);
      await expect(res).resolves.toBeUndefined();
    };

    const testShowPackageInfo = async () => {
      const res = showPackageInfo(validPkgName);
      await expect(res).resolves.toBeUndefined();
    };

    test("should be resolved", testUninstallPackage, 30000);

    describe("show the package info", () => {
      test("should be undefined", testShowPackageInfo);
    });

    describe("uninstall the package again", () => {
      test("should be resolved", testUninstallPackage, 30000);
    });

    describe("show the package info again", () => {
      test("should be undefined", testShowPackageInfo);
    });

    afterAll(async () => {
      await uninstallPackage(validPkgName);
    }, 30000);
  });
});
