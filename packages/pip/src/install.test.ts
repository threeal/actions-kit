import { RunResult } from "@actions-kit/exec";
import { expect, jest, test } from "@jest/globals";
import { PackageInfo, showPackageInfo } from "./info";
import { installPackage, uninstallPackage } from "./install";

let installed: string[] = [];

jest.mock("./pip", () => ({
  ...jest.requireActual<object>("./pip"),
  pip: {
    run: async (...args: string[]): Promise<RunResult> => {
      args = args.filter((arg) => !arg.startsWith("-"));
      expect(args).toHaveLength(2);
      const [command, pkg] = args;
      switch (command) {
        case "install":
          if (pkg !== "valid-package") return new RunResult(1);
          installed.push(pkg);
          break;
        case "uninstall":
          installed = installed.filter((installedPkg) => installedPkg !== pkg);
          break;
        default:
          return new RunResult(2);
      }
      return new RunResult(0);
    },
  },
}));

jest.mock("./info", () => ({
  ...jest.requireActual<object>("./info"),
  showPackageInfo: async (
    packageName: string
  ): Promise<PackageInfo | undefined> => {
    return installed.includes(packageName) ? new PackageInfo() : undefined;
  },
}));

test("installs and uninstalls a valid pip package", async () => {
  await expect(showPackageInfo("valid-package")).resolves.toBeUndefined();
  await expect(installPackage("valid-package")).resolves.toBeUndefined();
  await expect(showPackageInfo("valid-package")).resolves.not.toBeUndefined();
  await expect(uninstallPackage("valid-package")).resolves.toBeUndefined();
  await expect(showPackageInfo("valid-package")).resolves.toBeUndefined();
});

test("installs an invalid pip package", () => {
  return expect(installPackage("invalid-package")).rejects.toThrow();
});
