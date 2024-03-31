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

const TaskSolutionWorkspace: React.FC<{ jobId: string, task: UserTaskDTO }> = ({ jobId, task }) => {
    const {accessToken} = useAuth();
    const [files, setFiles] = useState<MyFile[]>([]);
    const [currentFileIndex, setCurrentFileIndex] = useState<number>(0);
    const [filesFetched, setFilesFetched] = useState(false);

    const currentFile = files[currentFileIndex];
    const currentTaskCookies = cookies.get(jobId);

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
    }, [files, jobId, filesFetched]);

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
            files: files.filter(f => f.type === ContentType.TXT ).map(file => ({
                name: file.name,
                type: file.type,
                contentBase64: file.contentBase64
            }))
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
            const newFile = new MyFile(name, getContentType(name), content);
            setFiles(prevFiles => [...prevFiles, newFile]);
            setCurrentFileIndex(files.length);
        } else {
            errorToast("File with this name already exists")
        }
    };

    const removeFile = (name: string) => {
        const fileToRemove = getFileByName(name);
        console.log(name)
        if(files.length === 1){
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
            {currentFile &&
                <div className="flex flex-col w-full h-full">
                    <FileTabManager
                        addFile={addFile}
                        removeFile={removeFile}
                        renameFile={renameFile}
                        currentFile={currentFile}
                        files={files}
                        getFileByName={(name) => getFileByName(name)}
                        setCurrentFileByName={setCurrentFileByName}
                    />
                    <Ide
                        files={files}
                        currentFileIndex={currentFileIndex}
                        setFiles={setFiles}
                        addFile={addFile}
                        taskId={task.id}
                        submitSolution={submit}
                        taskClosesAt={task.closesAt}
                        taskTimeLimit={task.timeLimit}
                        taskMemoryLimit={task.memoryLimit}
                    />
                </div>
            }
        </div>
    );
};

export default TaskSolutionWorkspace;
