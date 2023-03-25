export declare class PackageInfo {
    name: string;
    version: string;
    location: string;
    requires: string[];
    files: string[];
    directories(): string[];
    executables(): Promise<string[]>;
}
export declare function showPackageInfo(packageName: string): Promise<PackageInfo | undefined>;
