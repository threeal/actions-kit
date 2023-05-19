#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const child_process_1 = require("child_process");
const commander_1 = require("commander");
const program = new commander_1.Command();
program
    .command("build")
    .description("compile source files from TypeScript to JavaScript")
    .action(() => {
    (0, child_process_1.spawnSync)("tsc", [], { stdio: "inherit" });
});
program
    .command("clean")
    .description("clean the build output directory")
    .action(() => {
    (0, child_process_1.spawnSync)("rimraf", ["lib"], { stdio: "inherit" });
});
program.parse();
//# sourceMappingURL=dev.js.map