export function info(message: string) {
  process.env.TEST_STDOUT += `${message}\n`;
}
