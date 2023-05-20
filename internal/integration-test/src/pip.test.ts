import * as pip from "@actions-kit/pip";
import {afterAll, beforeAll, describe, expect, test } from "@jest/globals";

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
})
