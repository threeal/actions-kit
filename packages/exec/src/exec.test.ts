import { testExecOnSuccessAndFailed } from "./exec-helper.test";
import { execOut, execOutSilently, run, runSilently } from "./exec";

testExecOnSuccessAndFailed({
  title: "runs a command",
  shouldBeSilent: false,
  onSuccess: {
    exec: () => run("node", "-e", "console.log('some log')"),
    execScript: "exec.run('node', '-e', 'console.log(\"some log\")');",
  },
  onFailed: {
    exec: () => run("node", "-e", "throw new Error('some error')"),
    execScript: "exec.run('node', '-e', 'throw new Error(\"some error\")');",
  },
});

testExecOnSuccessAndFailed({
  title: "runs a command silently",
  shouldBeSilent: true,
  onSuccess: {
    exec: () => runSilently("node", "-e", "console.log('some log')"),
    execScript: "exec.runSilently('node', '-e', 'console.log(\"some log\")');",
  },
  onFailed: {
    exec: () => runSilently("node", "-e", "throw new Error('some error')"),
    execScript:
      "exec.runSilently('node', '-e', 'throw new Error(\"some error\")');",
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
