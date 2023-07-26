import { pip } from "./pip";

export async function installPackage(packageName: string) {
  const res = await pip.run("install", packageName);
  if (!res.isOk()) {
    throw new Error(
      `Failed to install pip package: ${packageName} (error code: ${res.code})`,
    );
  }
}

export async function uninstallPackage(packageName: string) {
  await pip.run("uninstall", "-y", packageName);
}
