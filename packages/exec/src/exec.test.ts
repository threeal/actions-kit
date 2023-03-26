import { testExecOnSuccessAndFailed } from "./exec-helper.test";
import { output, outputSilently, run, runSilently } from "./exec";

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
  title: "runs a command and gets the output",
  shouldBeSilent: false,
  onSuccess: {
    exec: () => output("node", "-e", "console.log('some log')"),
    expectedOutput: "some log\n",
    execScript: "exec.output('node', '-e', 'console.log(\"some log\")');",
  },
  onFailed: {
    exec: () => output("node", "-e", "throw new Error('some error')"),
    execScript: "exec.output('node', '-e', 'throw new Error(\"some error\")');",
  },
});

testExecOnSuccessAndFailed({
  title: "runs a command silently and gets the output",
  shouldBeSilent: true,
  onSuccess: {
    exec: () => outputSilently("node", "-e", "console.log('some log')"),
    expectedOutput: "some log\n",
    execScript:
      "exec.outputSilently('node', '-e', 'console.log(\"some log\")');",
  },
  onFailed: {
    exec: () => outputSilently("node", "-e", "throw new Error('some error')"),
    execScript:
      "exec.outputSilently('node', '-e', 'throw new Error(\"some error\")');",
  },
});
