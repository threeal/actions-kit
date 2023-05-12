import { Minimatch } from "minimatch";
import * as path from "path";

interface Dictionary<T> {
  [key: string]: T;
}

export interface Entry extends Dictionary<Entry | string> {}

function copyEntryRecursively(src: Entry, dst: Entry, names: string[]): Entry {
  if (names.length > 0) {
    const mm = new Minimatch(names[0]);
    for (const name in src) {
      if (!mm.match(name)) continue;
      const subSrc = src[name];
      if (typeof subSrc === "string") {
        dst[name] = subSrc;
      } else {
        let subDst = dst[name];
        if (subDst === undefined || typeof subDst === "string") subDst = {};
        dst[name] = copyEntryRecursively(subSrc, subDst, names.slice(1));
      }
    }
    return dst;
  }
  return src;
}

export function copyEntry(src: Entry, dst: Entry, entryPath: string): Entry {
  return copyEntryRecursively(src, dst, entryPath.split(path.sep));
}
