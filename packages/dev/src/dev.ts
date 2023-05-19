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

program.parse();
