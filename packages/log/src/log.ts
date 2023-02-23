import * as core from "@actions/core";
import styles from "ansi-styles";

export { info } from "@actions/core";

export function warning(message: string) {
  const label = `${styles.yellow.open}Warning:${styles.yellow.close}`;
  core.info(`${label} ${message}`);
}

export function error(message: string) {
  const label = `${styles.red.open}Error:${styles.red.close}`;
  core.info(`${label} ${message}`);
}
