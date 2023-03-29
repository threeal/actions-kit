import { output, outputSilently } from "./output";
import { testRunOnSuccessAndFailed } from "./run-helper.test";

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
