#!/usr/bin/env node

import { spawnSync } from "child_process";
import { Command } from "commander";

function exec(command: string, ...args: string[]) {
  const res = spawnSync(command, args, { stdio: "inherit", shell: true });
  if (res.error !== undefined) throw res.error;
  if (res.status !== 0) process.exit(res.status ?? -1);
}

const program = new Command();

program
  .command("build")
  .description("compile source files from TypeScript to JavaScript")
  .action(() => exec("tsc"));

program
  .command("clean")
  .description("clean the build output directory")
  .action(() => exec("rimraf", "lib"));

program
  .command("format")
  .description("format the source files using Prettier")
  .action(() => exec("prettier", "--write", "*.{js,ts,json}", "src/**/*.ts"));

program
  .command("lint")
  .description("lint the source files using ESLint")
  .action(() => exec("eslint", "src", "--ext", ".js,.ts"));

program
  .command("test")
  .description("run tests using Jest")
  .action(() => exec("jest"));

program.parse();
