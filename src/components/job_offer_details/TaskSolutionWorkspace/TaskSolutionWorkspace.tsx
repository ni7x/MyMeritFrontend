import React, {useEffect, useState} from "react";
import MyFile from "../../../models/MyFile";
import Ide from "./components/IDE/Ide";
import FileTabManager from "./components/FileTabManager/FileTabManager";
import Cookies from "universal-cookie";

import UserTaskDTO from "../../../models/dtos/UserTaskDTO";
import {useAuth} from "../../../hooks/useAuth";
import {downloadFiles, submitSolution} from "../../../services/JobOfferService";
import {ContentType, getContentType} from "./utils/fileUtils";
import {errorToast, successToast} from "../../../main";

const cookies = new Cookies();

const TaskSolutionWorkspace: React.FC<{ jobId: string, task: UserTaskDTO, isEditable: boolean }> = ({ jobId, task, isEditable }) => {
    const {accessToken} = useAuth();
    const [files, setFiles] = useState<MyFile[]>([]);
    const [filesFetched, setFilesFetched] = useState(false);
    const currentTaskCookies = cookies.get(jobId);
    const [mainFileIndex, setMainFileIndex] = useState<number>(currentTaskCookies ? currentTaskCookies.mainFileIndex : 0);
    const [currentFileIndex, setCurrentFileIndex] = useState<number>(currentTaskCookies ? currentTaskCookies.mainFileIndex : 0);
    const currentFile = files[currentFileIndex];

    useEffect(() => {
        const initializeFiles = async () => {
            if (task.userSolution) {
                try {
                    const response = await downloadFiles(jobId, accessToken);
                    if (response.ok) {
                        const fetchedFiles = await response.json();
                        const mergedFiles = currentTaskCookies ? mergeFilesWithCookies(fetchedFiles) : fetchedFiles;
                        setFiles(mergedFiles);
                        setFilesFetched(true);
                    } else {
                        console.error('Error downloading files:', response.statusText);
                    }
                } catch (error) {
                    console.error('Error fetching solution files:', error);
                }
            } else if (currentTaskCookies) {
                setFiles(currentTaskCookies.files.map(file => new MyFile(file.name, file.type, file.contentBase64)));
                setFilesFetched(true);
            }else{
                setFiles([new MyFile("main.cpp", ContentType.TXT, "")]);
                setFilesFetched(true);
            }
        };

        initializeFiles();
    }, [task, accessToken]);

    useEffect(() => {
        if (filesFetched) {
            cookies.set(jobId, serializeFiles(files, jobId),  { expires: new Date(task.closesAt) });
        }
    }, [files, jobId, filesFetched, mainFileIndex]);

    const withErrorHandling = (func) => (...args) => {
        try {
            if (!isEditable) {
                errorToast("Solution is read only");
                return;
            }
            func(...args);
        } catch (error) {
            errorToast("An error occurred while executing the operation");
        }
    };

    const mergeFilesWithCookies = (fetchedFiles) => {
        const filesFromCookies = currentTaskCookies.files;
        let mergedFiles = [...fetchedFiles];
        filesFromCookies.forEach(cookieFile => {
            const index = mergedFiles.findIndex(fetchedFile => fetchedFile.name === cookieFile.name);
            if (index !== -1) {
                mergedFiles[index] = new MyFile(cookieFile.name, cookieFile.type, cookieFile.contentBase64);
            } else {
                mergedFiles.push(new MyFile(cookieFile.name, cookieFile.type, cookieFile.contentBase64));
            }
        });

        mergedFiles = mergedFiles.filter(file => {
            return file.type !== ContentType.TXT || filesFromCookies.some(cookieFile => cookieFile.name === file.name);
        });

        return mergedFiles;
    };

    const serializeFiles = (files: MyFile[], jobId) => {
        return JSON.stringify({
            jobId: jobId,
            mainFileIndex: mainFileIndex,
            files: files.filter(f => f.type === ContentType.TXT ).map(file => ({
                name: file.name,
                type: file.type,
                contentBase64: file.contentBase64
            })
            )
        });
    };

    const getFileByName = (name: string) => {
        return files.find(file => file.name === name);
    };

    const setCurrentFileByName = (name: string) => {
        const index = files.findIndex(file => file.name === name);
        setCurrentFileIndex(index);
    };

    const addFile = (name: string, content: string=atob(" ")) => {
        if (!getFileByName(name)) {
            if(name.trim() != ""){
                const newFile = new MyFile(name, getContentType(name), content);
                setFiles(prevFiles => [...prevFiles, newFile]);
                setCurrentFileIndex(files.length);
            }else{
                errorToast("File must have name")
            }
        } else {
            errorToast("File with this name already exists")
        }
    };

    const removeFile = (name: string) => {
        const fileToRemove = getFileByName(name);
        const fileIndex = files.findIndex(f => f.name === fileToRemove.name);
        if(files.length === 1 || fileIndex == mainFileIndex){
            errorToast("Can't remove main file")
            return;
        }
        if (fileToRemove) {
            setCurrentFileIndex(0);
            setFiles(prevFiles => prevFiles.filter(file => file.name !== name));
        } else {
            console.log("File not found.");
        }
    };

    const setAsMain = (name: string) => {
        const fileIndex = files.findIndex(f => f.name === name);
        if (fileIndex !== -1) {
            setMainFileIndex(fileIndex);
        }
    };

    const renameFile = (name: string, newName: string) => {
        const fileToRename = getFileByName(name);
        if(!getFileByName(newName)){
            if (fileToRename) {
                setFiles(prevFiles => {
                    return prevFiles.map(file => {
                        if (file.name === name) {
                            return {...file, name: newName};
                        }
                        return file;
                    });
                });
            }
        }else{
            console.log("This file name already exists")
        }
    }

    const submit = () => {
        const fetchData = async () => {
            try {
                if(accessToken){
                    const response = await submitSolution(jobId, files, accessToken);
                    if (response.ok) {
                        successToast("Solution submitted");
                    }
                }else{
                    errorToast("Invalid access token");
                }
            } catch (error) {
                errorToast("Credentials expired");
            }
        };
        fetchData();
    };


    return (
        <div className="flex flex-col w-full lg:w-[65%] items-end h-auto">
            {currentFile && (
                <div className="flex flex-col w-full h-full">
                    <FileTabManager
                        addFile={withErrorHandling(addFile)}
                        removeFile={withErrorHandling(removeFile)}
                        renameFile={withErrorHandling(renameFile)}
                        currentFile={currentFile}
                        files={files}
                        mainFileIndex={mainFileIndex}
                        getFileByName={(name) => getFileByName(name)}
                        setCurrentFileByName={setCurrentFileByName}
                    />
                    <Ide
                        files={files}
                        currentFileIndex={currentFileIndex}
                        setFiles={withErrorHandling(setFiles)}
                        addFile={withErrorHandling(addFile)}
                        taskId={task.id}
                        mainFileIndex={mainFileIndex}
                        submitSolution={withErrorHandling(submit)}
                        setAsMain={withErrorHandling(setAsMain)}
                        taskClosesAt={task.closesAt}
                        taskTimeLimit={task.timeLimit}
                        taskMemoryLimit={task.memoryLimit}
                    />
                </div>
            )}
        </div>
    );
};

export default TaskSolutionWorkspace;
