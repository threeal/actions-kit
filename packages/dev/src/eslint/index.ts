import * as jsonfile from "jsonfile";
import { defaultEslintConfig } from "./default";

export function eslintConfig(config?: object): object {
  jsonfile.writeFileSync("tsconfig.eslint.json", {
    extends: "./tsconfig.json",
    exclude: [],
  });
  return { ...defaultEslintConfig, ...config };
}
