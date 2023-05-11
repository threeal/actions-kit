import { Minimatch } from "minimatch";

interface Dictionary<T> {
  [key: string]: T;
}

export interface Entry extends Dictionary<Entry | string> {}

export function copyEntry(src: Entry, dst: Entry, patterns: string[]): Entry {
  if (patterns.length > 0) {
    const mm = new Minimatch(patterns[0]);
    for (const name in src) {
      if (!mm.match(name)) continue;
      const subSrc = src[name];
      if (typeof subSrc === "string") {
        dst[name] = subSrc;
      } else {
        let subDst = dst[name];
        if (subDst === undefined || typeof subDst === "string") subDst = {};
        dst[name] = copyEntry(subSrc, subDst, patterns.slice(1));
      }
    }
    return dst;
  }
  return src;
}
