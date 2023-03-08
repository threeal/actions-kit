import * as actionsExec from "@actions/exec";

export async function exec(
  commandLine: string,
  args?: string[]
): Promise<void> {
  await actionsExec.exec(commandLine, args);
}
