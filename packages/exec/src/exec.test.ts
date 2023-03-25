import { testExecOnSuccessAndFailed } from "./exec-helper.test";
import { exec, execOut, execOutSilently, execSilently } from "./exec";

testExecOnSuccessAndFailed({
  title: "executes a command",
  onSuccess: {
    exec: () => exec("node", "-e", "process.exit();"),
  },
  onFailed: {
    exec: () => exec("node", "-e", "process.exit(1)"),
  },
});

testExecOnSuccessAndFailed({
  title: "executes a command silently",
  onSuccess: {
    exec: () => execSilently("node", "-e", "process.exit();"),
  },
  onFailed: {
    exec: () => execSilently("node", "-e", "process.exit(1)"),
  },
});

testExecOnSuccessAndFailed({
  title: "executes a command and gets the output",
  onSuccess: {
    exec: () => execOut("node", "-e", "console.log('some log');"),
    expectedOutput: "some log\n",
  },
  onFailed: {
    exec: () => execOut("node", "-e", "process.exit(1)"),
  },
});

testExecOnSuccessAndFailed({
  title: "executes a command silently and gets the output",
  onSuccess: {
    exec: () => execOutSilently("node", "-e", "console.log('some log');"),
    expectedOutput: "some log\n",
  },
  onFailed: {
    exec: () => execOutSilently("node", "-e", "process.exit(1)"),
  },
});
