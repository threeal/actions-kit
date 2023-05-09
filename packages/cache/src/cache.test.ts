import { restore, save } from "./cache";
import {
  afterAll,
  beforeAll,
  describe,
  expect,
  jest,
  test,
} from "@jest/globals";

interface Mock {
  caches: Map<string, string[]>;
  files: string[];
}

const mock: Mock = { caches: new Map(), files: [] };

jest.mock("@actions/cache", () => ({
  async saveCache(paths: string[], key: string): Promise<number> {
    const files: string[] = [];
    for (const path of paths) {
      if (mock.files.includes(path)) {
        files.push(path);
      }
    }
    mock.caches.set(key, files);
    return 0;
  },
  async restoreCache(
    paths: string[],
    primaryKey: string
  ): Promise<string | undefined> {
    const files = mock.caches.get(primaryKey);
    if (files === undefined) return undefined;
    for (const path of paths) {
      if (files.includes(path) && !mock.files.includes(path)) {
        mock.files.push(path);
      }
    }
    return primaryKey;
  },
}));

describe("saves and restores cache", () => {
  beforeAll(() => {
    mock.caches.clear();
    mock.files = [
      "/path/to/some-file.ext",
      "/path/to/some-other-file.ext",
      "/path/to/some-directory/of-some-file.ext",
      "/path/to/some-directory/of-some-other-file.ext",
    ];
  });

  const paths = mock.files;
  test("restores nonexistent cache", () => {
    const prom = restore("some-key", paths);
    return expect(prom).resolves.toBe(false);
  });

  test("saves cache", () => {
    const prom = save("some-key", paths);
    return expect(prom).resolves.toBeUndefined();
  });

  test("clear files", () => {
    mock.files = [];
  });

  test("restores cache", () => {
    const prom = restore("some-key", paths);
    return expect(prom).resolves.toBe(true);
  });

  test("files should be exist", () => {
    for (const path of paths) {
      expect(mock.files).toContain(path);
    }
  });

  afterAll(() => {
    mock.caches.clear();
    mock.files = [];
  });
});
