#!/usr/bin/env node

import { spawnSync } from "child_process";
import { Command } from "commander";

const program = new Command();

program
  .command("build")
  .description("compile source files from TypeScript to JavaScript")
  .action(() => {
    spawnSync("tsc", [], { stdio: "inherit" });
  });

program
  .command("clean")
  .description("clean the build output directory")
  .action(() => {
    spawnSync("rimraf", ["lib"], { stdio: "inherit" });
  });

program
  .command("format")
  .description("format the source files using Prettier")
  .action(() => {
    spawnSync("prettier", ["--write", "*.{js,ts,json}", "src/**/*.ts"], {
      stdio: "inherit",
    });
  });

program.parse();
