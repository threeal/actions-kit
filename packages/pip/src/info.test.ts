import { OutputResult } from "@actions-kit/exec";
import { describe, expect, jest, test } from "@jest/globals";
import { PackageInfo, showPackageInfo } from "./info";

jest.mock("fs", () => ({
  ...jest.requireActual<object>("fs"),
  existsSync: () => true,
}));

jest.mock("@actions/io", () => ({
  ...jest.requireActual<object>("@actions/io"),
  which: async (tool: string, check: boolean): Promise<string> => {
    expect(check).toBe(true);
    return `/path/to/bin/${tool}`;
  },
}));

jest.mock("./pip", () => ({
  ...jest.requireActual<object>("./pip"),
  pip: {
    outputSilently: async (...args: string[]): Promise<OutputResult> => {
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
    expect(info.location).toBe("/path/to/package");
    expect(info.requires).toStrictEqual([
      "some-dependency",
      "some-other-dependency",
    ]);
    expect(info.files).toStrictEqual([
      "../../bin/valid-package",
      "../../bin/some-executable",
      "valid-package/__init__.py",
      "valid-package/some_source.py",
      "valid-package/some_other_source.py",
    ]);
    expect(info.directories()).toStrictEqual([
      "/path/to/package/valid-package",
    ]);
    return expect(info.executables()).resolves.toStrictEqual([
      "/path/to/bin/valid-package",
      "/path/to/bin/some-executable",
    ]);
  });

  test("on an invalid package", () => {
    const info = showPackageInfo("invalid-package");
    return expect(info).resolves.toBeUndefined();
  });
});
