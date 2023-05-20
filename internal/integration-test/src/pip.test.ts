import * as pip from "@actions-kit/pip";
import { afterAll, beforeAll, describe, expect, test } from "@jest/globals";
import * as fs from "fs";

describe("installs and uninstalls a pip package (rsa)", () => {
  beforeAll(() => pip.uninstallPackage("rsa"));

  describe("installs the rsa package", () => {
    test("the package info should be undefined", () => {
      const prom = pip.showPackageInfo("rsa");
      return expect(prom).resolves.toBeUndefined();
    });

    test("installs the package", () => {
      const prom = pip.installPackage("rsa");
      return expect(prom).resolves.toBeUndefined();
    });

    test("installs the package again", () => {
      const prom = pip.installPackage("rsa");
      return expect(prom).resolves.toBeUndefined();
    });
  });

  describe("checks info of the rsa package", () => {
    let info: pip.PackageInfo;
    beforeAll(async () => {
      const prom = pip.showPackageInfo("rsa");
      expect(prom).resolves.not.toBeUndefined();
      info = (await prom) as pip.PackageInfo;
    });

    test("name should be correct", () => {
      expect(info.name).toBe("rsa");
    });

    test("version should be valid", () => {
      expect(info.version).toMatch(/^(\d+\.)?(\d+\.)?(\*|\d+)$/);
    });

    test("location should be exist", () => {
      expect(fs.existsSync(info.location)).toBe(true);
    });

    test("dependencies should be correct", () => {
      expect(info.requires).toStrictEqual(["pyasn1"]);
    });

    test("files should be correct", () => {
      expect(info.files).toHaveLength(42);
    });

    test("directories should be correct and exist", () => {
      const dirs = info.directories();
      expect(dirs).toHaveLength(2);
      for (const dir of dirs) {
        expect(fs.existsSync(dir)).toBe(true);
      }
    });

    test("executables should be correct and exist", async () => {
      const executables = await info.executables();
      expect(executables).toHaveLength(6);
      for (const executable of executables) {
        expect(fs.existsSync(executable)).toBe(true);
      }
    });
  });

  describe("uninstalls the rsa package", () => {
    test("the package info should not be undefined", () => {
      const prom = pip.showPackageInfo("rsa");
      return expect(prom).resolves.not.toBeUndefined();
    });

    test("uninstalls the package", () => {
      const prom = pip.uninstallPackage("rsa");
      return expect(prom).resolves.toBeUndefined();
    });

    test("uninstalls the package again", () => {
      const prom = pip.uninstallPackage("rsa");
      return expect(prom).resolves.toBeUndefined();
    });
  });

  afterAll(() => pip.uninstallPackage("rsa"));
});
