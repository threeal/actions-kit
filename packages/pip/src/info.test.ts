import { OutputResult } from "@actions-kit/exec";
import { describe, expect, jest, test } from "@jest/globals";
import * as path from "path";
import { PackageInfo, showPackageInfo } from "./info";

jest.mock("fs", () => ({
  ...jest.requireActual<object>("fs"),
  existsSync() {
    return true;
  },
}));

jest.mock("@actions/io", () => ({
  ...jest.requireActual<object>("@actions/io"),
  async which(tool: string, check: boolean): Promise<string> {
    expect(check).toBe(true);
    return path.join("/", "path", "to", "bin", tool);
  },
}));

jest.mock("./pip", () => ({
  ...jest.requireActual<object>("./pip"),
  pip: {
    async outputSilently(...args: string[]): Promise<OutputResult> {
      expect(args).toHaveLength(3);
      expect(args[0]).toBe("show");
      expect(args[1]).toBe("-f");
      if (args[2] !== "valid-package") return new OutputResult(1, "");
      const out = [
        "Name: valid-package",
        "Version: 0.1.0",
        "Location: /path/to/package",
        "Requires: some-dependency, some-other-dependency",
        "Files:",
        "  ../../bin/valid-package",
        "  ../../bin/some-executable",
        "  valid-package/__init__.py",
        "  valid-package/some_source.py",
        "  valid-package/some_other_source.py",
      ].join("\n");
      return new OutputResult(0, out);
    },
  },
}));

describe("shows info of a pip package", () => {
  test("on a valid package", async () => {
    const prom = showPackageInfo("valid-package");
    expect(prom).resolves.toBeInstanceOf(PackageInfo);
    const info = (await prom) as PackageInfo;
    expect(info.name).toBe("valid-package");
    expect(info.version).toBe("0.1.0");
    expect(info.location).toBe(path.join("/", "path", "to", "package"));
    expect(info.requires).toStrictEqual([
      "some-dependency",
      "some-other-dependency",
    ]);
    expect(info.files).toStrictEqual([
      path.join("..", "..", "bin", "valid-package"),
      path.join("..", "..", "bin", "some-executable"),
      path.join("valid-package", "__init__.py"),
      path.join("valid-package", "some_source.py"),
      path.join("valid-package", "some_other_source.py"),
    ]);
    expect(info.directories()).toStrictEqual([
      path.join("/", "path", "to", "package", "valid-package"),
    ]);
    return expect(info.executables()).resolves.toStrictEqual([
      path.join("/", "path", "to", "bin", "valid-package"),
      path.join("/", "path", "to", "bin", "some-executable"),
    ]);
  });

  test("on an invalid package", () => {
    const info = showPackageInfo("invalid-package");
    return expect(info).resolves.toBeUndefined();
  });
});
