import MyFile from "../../../models/MyFile";
import {ContentType} from "./fileUtils";

export const mergeFilesWithCookies = (fetchedFiles: MyFile[], currentTaskCookies: any): MyFile[] => {
    const filesFromCookies = currentTaskCookies.files;
    let mergedFiles: MyFile[] = [...fetchedFiles];
    filesFromCookies.forEach((cookieFile) => {
        const index = mergedFiles.findIndex((fetchedFile) => fetchedFile.name === cookieFile.name);
        if (index !== -1) {
            mergedFiles[index] = new MyFile(cookieFile.name, cookieFile.type, cookieFile.contentBase64);
        } else {
            mergedFiles.push(new MyFile(cookieFile.name, cookieFile.type, cookieFile.contentBase64));
        }
    });

    mergedFiles = mergedFiles.filter((file) => {
        return file.type !== ContentType.TXT || filesFromCookies.some((cookieFile) => cookieFile.name === file.name);
    });

    return mergedFiles;
};

export const serializeFiles = (files: MyFile[], jobId: string, mainFileIndex: number): string => {
    return JSON.stringify({
        jobId: jobId,
        mainFileIndex: mainFileIndex,
        files: files
            .filter((f) => f.type === ContentType.TXT)
            .map((file) => ({
                name: file.name,
                type: file.type,
                contentBase64: file.contentBase64,
            })),
    });
};
