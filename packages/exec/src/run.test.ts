import { testRunOnSuccessAndFailed } from "./run-helper.test";
import { output, outputSilently, run, runSilently } from "./run";

testRunOnSuccessAndFailed({
  title: "runs a command",
  shouldBeSilent: false,
  onSuccess: {
    run: () => run("node", "-e", "console.log('some log')"),
    runScript: "exec.run('node', '-e', 'console.log(\"some log\")');",
  },
  onFailed: {
    run: () => run("node", "-e", "throw new Error('some error')"),
    runScript: "exec.run('node', '-e', 'throw new Error(\"some error\")');",
  },
});

testRunOnSuccessAndFailed({
  title: "runs a command silently",
  shouldBeSilent: true,
  onSuccess: {
    run: () => runSilently("node", "-e", "console.log('some log')"),
    runScript: "exec.runSilently('node', '-e', 'console.log(\"some log\")');",
  },
  onFailed: {
    run: () => runSilently("node", "-e", "throw new Error('some error')"),
    runScript:
      "exec.runSilently('node', '-e', 'throw new Error(\"some error\")');",
  },
});

testRunOnSuccessAndFailed({
  title: "runs a command and gets the output",
  shouldBeSilent: false,
  onSuccess: {
    run: () => output("node", "-e", "console.log('some log')"),
    expectedOutput: "some log\n",
    runScript: "exec.output('node', '-e', 'console.log(\"some log\")');",
  },
  onFailed: {
    run: () => output("node", "-e", "throw new Error('some error')"),
    runScript: "exec.output('node', '-e', 'throw new Error(\"some error\")');",
  },
});

testRunOnSuccessAndFailed({
  title: "runs a command silently and gets the output",
  shouldBeSilent: true,
  onSuccess: {
    run: () => outputSilently("node", "-e", "console.log('some log')"),
    expectedOutput: "some log\n",
    runScript:
      "exec.outputSilently('node', '-e', 'console.log(\"some log\")');",
  },
  onFailed: {
    run: () => outputSilently("node", "-e", "throw new Error('some error')"),
    runScript:
      "exec.outputSilently('node', '-e', 'throw new Error(\"some error\")');",
  },
});
