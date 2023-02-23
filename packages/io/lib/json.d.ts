/// <reference types="node" />
import * as fs from "fs";
export declare function writeJsonFile(file: fs.PathOrFileDescriptor, data: any): void;
export declare function readJsonFile<Type>(file: fs.PathOrFileDescriptor): Type;
