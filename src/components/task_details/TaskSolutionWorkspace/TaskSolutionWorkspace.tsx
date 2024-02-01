import React, { useState } from "react";
import File from "../../../models/File";
import AddFileButton from "./components/FileTabManager/components/AddFileButton";
import "./task_solution_workspace.css";
import Ide from "./components/IDE/Ide";
import FileList from "./components/FileTabManager/components/FileList";
import FileTabManager from "./components/FileTabManager/FileTabManager";

const TaskSolutionWorkspace: React.FC<{ taskId: string }> = ({ taskId }) => {
    const [files, setFiles] = useState<File[]>([new File("index.js", "javascript", "")]);
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
            const newFile = new File(name, language, content);
            setFiles(prevFiles => [...prevFiles, newFile]);
            setCurrentFileIndex(files.length);
        } else {
            console.log("This file already exists.");
        }
    };

    const removeFile = (name: string) => {
        setFiles(prevFiles => prevFiles.filter(file => file.name !== name));
    };

    return (
        <div className="task-solution-workspace">
            {currentFile &&
                <div className="task-solution-workspace-wrapper">
                    <FileTabManager
                        addFile={addFile}
                        currentFile={currentFile}
                        files={files}
                        setCurrentFileByName={setCurrentFileByName}
                    />
                    <Ide files={files}
                         currentFileIndex={currentFileIndex}
                         setFiles={setFiles}
                         addFile={addFile}
                    />
                </div>
            }
        </div>
    );
};

export default TaskSolutionWorkspace;
