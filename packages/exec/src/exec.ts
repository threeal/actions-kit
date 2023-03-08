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

export async function execCheck(
  commandLine: string,
  args?: string[]
): Promise<boolean> {
  const rc = await actionsExec.exec(commandLine, args, {
    silent: true,
    ignoreReturnCode: true,
  });
  return rc === 0;
}

export async function execOutCheck(
  commandLine: string,
  args?: string[]
): Promise<[string, boolean]> {
  let out = "";
  const rc = await actionsExec.exec(commandLine, args, {
    silent: true,
    ignoreReturnCode: true,
    listeners: {
      stdout: (data: Buffer) => {
        out += data.toString();
      },
    },
  });
  return [out, rc === 0];
}
