import * as pip from "@actions-kit/pip";
import { afterAll, beforeAll, describe, expect, it } from "@jest/globals";
import * as fs from "fs";
import { repeat } from "./helper.test";

describe("Pip package installation and uninstallation (rsa)", () => {
  beforeAll(() => {
    return repeat(() => pip.uninstallPackage("rsa"), 10000);
  }, 3 * 10000);

  describe("Installing the rsa package", () => {
    it("should show the package info as undefined", () => {
      const promise = pip.showPackageInfo("rsa");
      return expect(promise).resolves.toBeUndefined();
    });

    // prettier-ignore
    it("should install the package successfully", () => {
      const promise = repeat(() => pip.installPackage("rsa"), 30000);
      return expect(promise).resolves.toBeUndefined();
    }, 3 * 30000);

    it("should show the package info as not undefined", () => {
      const promise = pip.showPackageInfo("rsa");
      return expect(promise).resolves.not.toBeUndefined();
    });

    it("should install the package again successfully", () => {
      const promise = pip.installPackage("rsa");
      return expect(promise).resolves.toBeUndefined();
    });
  });

  describe("Checking the rsa package info", () => {
    let packageInfo: pip.PackageInfo;
    beforeAll(async () => {
      const promise = pip.showPackageInfo("rsa");
      expect(promise).resolves.not.toBeUndefined();
      packageInfo = (await promise) as pip.PackageInfo;
    });

    it("should have the correct package name", () => {
      expect(packageInfo.name).toBe("rsa");
    });

    it("should have a valid version", () => {
      expect(packageInfo.version).toMatch(/^(\d+\.)?(\d+\.)?(\*|\d+)$/);
    });

    it("should have a valid location", () => {
      expect(fs.existsSync(packageInfo.location)).toBe(true);
    });

    it("should have the correct dependencies", () => {
      expect(packageInfo.requires).toStrictEqual(["pyasn1"]);
    });

    it("should have the correct number of files", () => {
      expect(packageInfo.files).toHaveLength(42);
    });

    it("should have the correct directories that exist", () => {
      const directories = packageInfo.directories();
      expect(directories).toHaveLength(2);
      for (const directory of directories) {
        expect(fs.existsSync(directory)).toBe(true);
      }
    });

    it("should have the correct executables that exist", async () => {
      const executables = await packageInfo.executables();
      expect(executables).toHaveLength(6);
      for (const executable of executables) {
        expect(fs.existsSync(executable)).toBe(true);
      }
    });
  });

  describe("Uninstalling the rsa package", () => {
    it("should show the package info as not undefined", () => {
      const promise = pip.showPackageInfo("rsa");
      return expect(promise).resolves.not.toBeUndefined();
    });

    it("should uninstall the package successfully", () => {
      const promise = pip.uninstallPackage("rsa");
      return expect(promise).resolves.toBeUndefined();
    });

    it("should show the package info as undefined", () => {
      const promise = pip.showPackageInfo("rsa");
      return expect(promise).resolves.toBeUndefined();
    });

    it("should uninstall the package again successfully", () => {
      const promise = pip.uninstallPackage("rsa");
      return expect(promise).resolves.toBeUndefined();
    });
  });

  afterAll(() => pip.uninstallPackage("rsa"));
});
