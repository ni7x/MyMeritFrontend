import React, { useState} from "react";
import File from "../../../models/File";
import Ide from "./components/IDE/Ide";
import FileTabManager from "./components/FileTabManager/FileTabManager";

import UserTaskDTO from "../../../models/dtos/UserTaskDTO";
import {useAuth} from "../../../hooks/useAuth";
import {submitSolution} from "../../../services/JobOfferService";

const TaskSolutionWorkspace: React.FC<{ task: UserTaskDTO }> = ({ task }) => {

    const [files, setFiles] = useState<File[]>(() => {
        if (task.solution) {
            return task.solution.files.map((file) => new File(
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

    const {authToken} = useAuth();

    const submit = () => {
        const fetchData = async () => {
            try {
                if(authToken){
                    const response = await submitSolution(taskId, files, authToken);
                    if (response.ok) {
                        console.log(response)
                    }
                }else{
                    console.log("no token provided")
                }


            } catch (error) {
                console.error("Error fetching tasks:", error);
            }
        };
        fetchData();
    };


    return (
        <div className="flex flex-col w-[100%] lg:w-[67.5%] items-end">
            {currentFile &&
                <div className="w-full">
                    <FileTabManager
                        addFile={addFile}
                        removeFile={removeFile}
                        renameFile={renameFile}
                        currentFile={currentFile}
                        files={files}
                        getFileByName={(name) => getFileByName(name)}
                        setCurrentFileByName={setCurrentFileByName}
                    />
                    <Ide files={files}
                         currentFileIndex={currentFileIndex}
                         setFiles={setFiles}
                         addFile={addFile}
                         setAsMain={setAsMain}
                         taskId={task.id}
                    />
                    <button
                        className="bg-blue-400 p-2 px-5 text-sm font-semibold float-right mt-3 rounded w-[10rem]"
                        onClick={submit}
                    >
                        submit solution
                    </button>
                </div>
            }
        </div>
    );
};

export default TaskSolutionWorkspace;
