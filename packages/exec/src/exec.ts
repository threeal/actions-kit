import * as actionsExec from "@actions/exec";

export async function exec(
  commandLine: string,
  args?: string[]
): Promise<void> {
  await actionsExec.exec(commandLine, args);
}

export async function execOut(
  commandLine: string,
  args?: string[]
): Promise<string> {
  let out = "";
  await actionsExec.exec(commandLine, args, {
    silent: true,
    listeners: {
      stdout: (data: Buffer) => {
        out += data.toString();
      },
    },
  });
  return out;
}
