import { testExecOnSuccessAndFailed } from "./exec-helper.test";
import { exec, execOut, execOutSilently, execSilently } from "./exec";

testExecOnSuccessAndFailed({
  title: "executes a command",
  shouldBeSilent: false,
  onSuccess: {
    exec: () => exec("node", "-e", "console.log('some log')"),
    execScript: "exec.exec('node', '-e', 'console.log(\"some log\")');",
  },
  onFailed: {
    exec: () => exec("node", "-e", "throw new Error('some error')"),
    execScript: "exec.exec('node', '-e', 'throw new Error(\"some error\")');",
  },
});

testExecOnSuccessAndFailed({
  title: "executes a command silently",
  shouldBeSilent: true,
  onSuccess: {
    exec: () => execSilently("node", "-e", "console.log('some log')"),
    execScript: "exec.execSilently('node', '-e', 'console.log(\"some log\")');",
  },
  onFailed: {
    exec: () => execSilently("node", "-e", "throw new Error('some error')"),
    execScript:
      "exec.execSilently('node', '-e', 'throw new Error(\"some error\")');",
  },
});

testExecOnSuccessAndFailed({
  title: "executes a command and gets the output",
  shouldBeSilent: false,
  onSuccess: {
    exec: () => execOut("node", "-e", "console.log('some log')"),
    expectedOutput: "some log\n",
    execScript: "exec.execOut('node', '-e', 'console.log(\"some log\")');",
  },
  onFailed: {
    exec: () => execOut("node", "-e", "throw new Error('some error')"),
    execScript:
      "exec.execOut('node', '-e', 'throw new Error(\"some error\")');",
  },
});

testExecOnSuccessAndFailed({
  title: "executes a command silently and gets the output",
  shouldBeSilent: true,
  onSuccess: {
    exec: () => execOutSilently("node", "-e", "console.log('some log')"),
    expectedOutput: "some log\n",
    execScript:
      "exec.execOutSilently('node', '-e', 'console.log(\"some log\")');",
  },
  onFailed: {
    exec: () => execOutSilently("node", "-e", "throw new Error('some error')"),
    execScript:
      "exec.execOutSilently('node', '-e', 'throw new Error(\"some error\")');",
  },
});
