import React, {useEffect, useState} from "react";
import File from "../../../models/File";
import Ide from "./components/IDE/Ide";
import FileTabManager from "./components/FileTabManager/FileTabManager";
import Cookies from "universal-cookie";

import UserTaskDTO from "../../../models/dtos/UserTaskDTO";
import {useAuth} from "../../../hooks/useAuth";
import {submitSolution} from "../../../services/JobOfferService";

const cookies = new Cookies();

const TaskSolutionWorkspace: React.FC<{ jobId: string, task: UserTaskDTO }> = ({ jobId, task }) => {
    const {accessToken} = useAuth();


    const [files, setFiles] = useState(() => {
        const currentTask = cookies.get(task.id);
        if (currentTask) {
            return currentTask.files.map(file => new File(file.name, file.content, file.isMain));
        } else if (task.solution) {
            return task.solution.files.map(file => new File(
                file.name,
                file.content,
                file.isMain
            ));
        } else {
            return [new File("main.cpp", "", true)];
        }
    });

    const [currentFileIndex, setCurrentFileIndex] = useState<number>(0);
    const currentFile = files[currentFileIndex];

    useEffect(() => {
        cookies.set(task.id, serializeFiles(files, task.id),  { expires: new Date(task.closesAt) });
    }, [files]);


    const serializeFiles = (files, taskId) => {
        return JSON.stringify({
            taskId: taskId,
            files: files.map(file => ({
                name: file.name,
                content: file.content,
                isMain: file.isMain
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

    const addFile = (name: string, language: string, content: string="") => {
        if (!getFileByName(name)) {
            const newFile = new File(name, content, false);
            setFiles(prevFiles => [...prevFiles, newFile]);
            setCurrentFileIndex(files.length);
        } else {
            console.log("This file already exists.");
        }
    };

    const removeFile = (name: string) => {
        const fileToRemove = getFileByName(name);
        console.log(name)
        if(fileToRemove.isMain){
            console.log("Can't remove main file")
            return;
        }
        if (fileToRemove) {
            setCurrentFileIndex(0);
            setFiles(prevFiles => prevFiles.filter(file => file.name !== name));
            console.log("XD", files);
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



    const setAsMain = (name: string) => {
        console.log("XD")
        setFiles(prevFiles => {
            return prevFiles.map(file => {
                if (file.name === name) {
                    return {...file, isMain: true};
                }
                return {...file, isMain: false};
            });
        });
    }

    const submit = () => {
        const fetchData = async () => {
            try {
                if(accessToken){
                    const response = await submitSolution(jobId, files, accessToken);
                    if (response.ok) {
                        alert("ok")
                    }
                }else{
                    alert("error: no token")
                }
            } catch (error) {
                console.error("Error fetching tasks:", error);
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
                        setAsMain={setAsMain}
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
