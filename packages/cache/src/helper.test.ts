import { Minimatch } from "minimatch";

interface Dictionary<T> {
  [key: string]: T;
}

export interface Entry extends Dictionary<Entry> {}

export function copyEntry(src: Entry, dst: Entry, patterns: string[]): Entry {
  if (patterns.length > 0) {
    const mm = new Minimatch(patterns[0]);
    for (const name in src) {
      if (!mm.match(name)) continue;
      if (dst[name] === undefined) dst[name] = {};
      dst[name] = copyEntry(src[name], dst[name], patterns.slice(1));
    }
    return dst;
  }
  return src;
}
