export declare class PackageCacheInfo {
    name: string;
    key: string;
    path: string;
    constructor(packageName: string);
    accumulateContentInfo(): Promise<PackageContentCacheInfo>;
    saveContentInfo(contentInfo: PackageContentCacheInfo): Promise<void>;
    restoreContentInfo(): Promise<PackageContentCacheInfo | undefined>;
    static root(): string;
    static createRoot(): void;
}
export declare class PackageContentCacheInfo {
    name: string;
    key: string;
    paths: string[];
    static accumulate(packageName: string): Promise<PackageContentCacheInfo>;
    static accumulatePaths(packageName: string): Promise<string[]>;
    save(): Promise<void>;
    restore(): Promise<boolean>;
}
