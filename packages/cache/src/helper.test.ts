import { Minimatch } from "minimatch";
import * as path from "path";

export class File {
  content: string;

  constructor(content?: string) {
    this.content = content ?? "";
  }
}

export class Directory {
  children: Map<string, Entry>;

  constructor(children?: { [name: string]: Entry }) {
    this.children = new Map();
    for (const name in children) {
      this.children.set(name, children[name]);
    }
  }

  glob(pattern: string): [string, Entry][] {
    const matcher = new Minimatch(pattern);
    const children: [string, Entry][] = [];
    for (const [name, child] of this.children.entries()) {
      if (matcher.match(name)) children.push([name, child]);
    }
    return children;
  }

  write(content: string, entryPath: string) {
    let entry: Entry = this;
    const names = entryPath.split(path.sep);
    for (const [i, name] of names.entries()) {
      if (!(entry instanceof Directory)) return;
      let subEntry = entry.children.get(name);
      if (i === names.length - 1) {
        if (subEntry instanceof File) {
          subEntry.content = content;
        } else {
          entry.children.set(name, new File(content));
        }
      } else {
        if (!(subEntry instanceof Directory)) {
          subEntry = new Directory();
          entry.children.set(name, subEntry);
        }
        entry = subEntry;
      }
    }
  }

  read(entryPath: string): string | undefined {
    let entry: Entry = this;
    for (const name of entryPath.split(path.sep)) {
      if (!(entry instanceof Directory)) return undefined;
      const subEntry = entry.children.get(name);
      if (subEntry === undefined) return undefined;
      entry = subEntry;
    }
    return entry instanceof File ? entry.content : undefined;
  }
}

type Entry = Directory | File;

function copyFile(src: File, dst: File) {
  dst.content = src.content;
}

function copyDirectory(src: Directory, dst: Directory, names: string[]) {
  if (names.length < 1) {
    dst.children = src.children;
    return;
  }
  for (const [name, srcChild] of src.glob(names[0])) {
    let dstChild = dst.children.get(name);
    if (srcChild instanceof File) {
      if (!(dstChild instanceof File)) {
        dstChild = new File("");
        dst.children.set(name, dstChild);
      }
      copyFile(srcChild, dstChild);
    } else {
      if (!(dstChild instanceof Directory)) {
        dstChild = new Directory({});
        dst.children.set(name, dstChild);
      }
      copyDirectory(srcChild, dstChild, names.slice(1));
    }
  }
}

export function copyRoot(src: Directory, dst: Directory, entryPath: string) {
  copyDirectory(src, dst, entryPath.split(path.sep));
}
