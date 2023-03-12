import * as actionsExec from "@actions/exec";
import { Result } from "./result";

export async function exec(
  commandLine: string,
  args?: string[]
): Promise<Result> {
  const rc = await actionsExec.exec(commandLine, args, {
    silent: true,
    ignoreReturnCode: true,
  });
  return new Result(rc);
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

export async function execOutCheck(
  commandLine: string,
  args?: string[]
): Promise<Result> {
  const res = new Result();
  res.code = await actionsExec.exec(commandLine, args, {
    silent: true,
    ignoreReturnCode: true,
    listeners: {
      stdout: (data: Buffer) => {
        res.output += data.toString();
      },
    },
  });
  return res;
}
