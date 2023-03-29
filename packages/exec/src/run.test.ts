import { testRunOnSuccessAndFailed } from "./run-helper.test";
import { run, runSilently } from "./run";

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
