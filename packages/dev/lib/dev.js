#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const child_process_1 = require("child_process");
const commander_1 = require("commander");
function exec(command, ...args) {
    (0, child_process_1.spawnSync)(command, args, { stdio: "inherit" });
}
const program = new commander_1.Command();
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
program.parse();
//# sourceMappingURL=dev.js.map