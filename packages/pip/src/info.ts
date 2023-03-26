import * as io from "@actions/io";
import * as fs from "fs";
import * as path from "path";
import { pip } from "./pip";

function isPackageDirectory(directory: string, pacageName: string): boolean {
  return directory.toLowerCase().includes(pacageName.toLowerCase());
}

export class PackageInfo {
  name: string = "";
  version: string = "";
  location: string = "";
  requires: string[] = [];
  files: string[] = [];

  directories(): string[] {
    const dirs: string[] = [];
    for (const file of this.files) {
      const strs = file.split(path.sep);
      const dir = strs[0];
      if (dirs.includes(dir)) continue;
      if (isPackageDirectory(dir, this.name)) dirs.push(dir);
    }
    const absDirs: string[] = [];
    for (const dir of dirs) {
      const absDir = path.join(this.location, dir);
      if (fs.existsSync(absDir)) absDirs.push(absDir);
    }
    return absDirs;
  }

  async executables(): Promise<string[]> {
    const executables: string[] = [];
    for (const file of this.files) {
      const strs = file.split(path.sep);
      // check if it's package directory
      if (strs.length > 0 && isPackageDirectory(strs[0], this.name)) continue;
      const executable = path.basename(file);
      const absExecutable = await io.which(executable, true);
      executables.push(absExecutable);
    }
    return executables;
  }
}

export async function showPackageInfo(
  packageName: string
): Promise<PackageInfo | undefined> {
  const res = await pip.output("show", "-f", packageName);
  if (!res.isOk()) return undefined;
  const lines = res.output.split("\n");
  const packageInfo = new PackageInfo();
  for (let i = 0; i < lines.length - 1; ++i) {
    const strs = lines[i].split(/:(.*)/s);
    if (strs.length >= 1 && strs[0] === "Files") {
      for (let j = i + 1; j < lines.length; ++j) {
        const line = lines[j].trim();
        // Check if the first line does not contain this error message
        if (line.length > 0 && !line.includes("Cannot locate")) {
          packageInfo.files.push(line);
        }
      }
      break;
    } else if (strs.length >= 2) {
      switch (strs[0]) {
        case "Name":
          packageInfo.name = strs[1].trim();
          break;
        case "Version":
          packageInfo.version = strs[1].trim();
          break;
        case "Location":
          packageInfo.location = strs[1].trim();
          break;
        case "Requires":
          packageInfo.requires = strs[1]
            .split(",")
            .map((str) => str.trim())
            .filter((str) => str.length > 0);
          break;
      }
    }
  }
  return packageInfo;
}
