import * as core from "@actions/core";

export function info(message: string) {
  if (process.env.TEST_STDOUT === undefined) {
    process.env.TEST_STDOUT = message;
  } else {
    process.env.TEST_STDOUT += message;
  }
}
