import MyFile from "../../../models/MyFile";
import {ContentType, getContentType} from "./utils/fileUtils";
import React from "react";
import {errorToast} from "../../../main";

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


//moze kiedys gdy bd czas to zrefactoruje i uzyje tych metod


export const getFileByName1 = (files: MyFile[], name: string): MyFile | undefined => {
    return files.find((file) => file.name === name);
};

export const setCurrentFileByName = (name: string, files: MyFile[], setCurrentFileIndex: React.Dispatch<React.SetStateAction<number>>) => {
    const index = files.findIndex((file) => file.name === name);
    setCurrentFileIndex(index);
};

export const addFile = (name: string, content: string = atob(" "), files: MyFile[], setFiles: React.Dispatch<React.SetStateAction<MyFile[]>>, setCurrentFileIndex: React.Dispatch<React.SetStateAction<number>>) => {
    if (!getFileByName(files, name)) {
        if (name.trim() !== "") {
            const newFile = new MyFile(name, getContentType(name), content);
            setFiles((prevFiles) => [...prevFiles, newFile]);
            setCurrentFileIndex(files.length);
        } else {
            errorToast("File must have a name");
        }
    } else {
        errorToast("File with this name already exists");
    }
};

export const removeFile = (name: string, files: MyFile[], setFiles: React.Dispatch<React.SetStateAction<MyFile[]>>, setCurrentFileIndex: React.Dispatch<React.SetStateAction<number>>, mainFileIndex: number) => {
    const fileToRemove = getFileByName(files, name);
    if (!fileToRemove) {
        errorToast("Couldn't find the file");
        return;
    }
    const fileIndex = files.findIndex((f) => f.name === fileToRemove.name);
    if (files.length === 1 || fileIndex === mainFileIndex) {
        errorToast("Can't remove the main file");
        return;
    }
    setCurrentFileIndex(0);
    setFiles((prevFiles) => prevFiles.filter((file) => file.name !== name));
};

export const setAsMain = (name: string, files: MyFile[], setMainFileIndex: React.Dispatch<React.SetStateAction<number>>) => {
    const fileIndex = files.findIndex((f) => f.name === name);
    if (fileIndex !== -1) {
        setMainFileIndex(fileIndex);
    }
};

export const renameFile = (name: string, newName: string, files: MyFile[], setFiles: React.Dispatch<React.SetStateAction<MyFile[]>>) => {
    const fileToRename = getFileByName(files, name);
    if (!getFileByName(files, newName)) {
        if (fileToRename) {
            setFiles((prevFiles) =>
                prevFiles.map((file) => {
                    if (file.name === name) {
                        return { ...file, name: newName };
                    }
                    return file;
                })
            );
        }
    } else {
        console.log("This file name already exists");
    }
};