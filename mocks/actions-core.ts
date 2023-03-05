export function info(message: string) {
  process.env.TEST_STDOUT += `${message}\n`;
}

export function startGroup(name: string) {
  process.env.TEST_STDOUT += `GROUP_START ${name}\n`;
}

export function endGroup() {
  process.env.TEST_STDOUT += "GROUP_END\n";
}
