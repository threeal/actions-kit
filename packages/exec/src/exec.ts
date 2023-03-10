import * as actionsExec from "@actions/exec";
import { Result } from "./result";

export async function exec(
  command: string,
  ...args: string[]
): Promise<Result> {
  const rc = await actionsExec.exec(command, args, {
    silent: true,
    ignoreReturnCode: true,
  });
  return new Result(rc);
}

export async function execOut(
  command: string,
  ...args: string[]
): Promise<Result> {
  const res = new Result();
  res.code = await actionsExec.exec(command, args, {
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
