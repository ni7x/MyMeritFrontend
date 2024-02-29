import React, { useState} from "react";
import File from "../../../models/File";
import Ide from "./components/IDE/Ide";
import FileTabManager from "./components/FileTabManager/FileTabManager";
import JSZip from "jszip";
import {decodeBase64} from "./fileUtils";
import CodeExecutionOutput from "../../../models/CodeExecutionOutput";

const TaskSolutionWorkspace: React.FC<{ taskId: string }> = ({ taskId }) => {
    const code = `#include <iostream>\n#include "firstFile.h"\nusing namespace std;\nextern int add(int a, int b);\nint main() {\ncout << add(14, 16) << endl;\ncout << add(2, 3) << endl;\nreturn 0;\n}`;

    const [files, setFiles] = useState<File[]>([
        new File("main.cpp", code, true),
        new File("firstFile.h", "int add(int a, int b) { return a + b; }", false)
    ]);

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
            if(currentFile == fileToRemove){
                setCurrentFileIndex((index)=>index-1);
            }
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

    console.log(files)

    return (
        <div className="task-solution-workspace w-[100%] lg:w[60%]">
            {currentFile &&
                <div className="task-solution-workspace-wrapper">
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
                    />
                </div>
            }
        </div>
    );
};

export default TaskSolutionWorkspace;
