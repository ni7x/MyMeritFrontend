import RunButton from "./RunButton";
import React  from "react";
import File from "../../../../../../models/File";
import CodeExecutionOutput from "../../../../../../models/CodeExecutionOutput";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEraser, faFileCode} from "@fortawesome/free-solid-svg-icons";

interface ControlsProps {
    files: File[];
    currentFileIndex: number;
    addFile: (name: string, language: string, content?: string) => void;
    setCodeOutput: (output: CodeExecutionOutput) => void;
    setFiles: (files: File[]) => void;
    setAsMain: (name: string) => void;
}

const Controls: React.FC<ControlsProps>  = ({files, currentFileIndex, setLoading, setCodeOutput, setFiles, setAsMain, taskId}) => {
    const currentFile = files[currentFileIndex];

    const clearCurrentFile = () => {
        const updatedFiles = [...files];
        updatedFiles[currentFileIndex].content = "";
        setFiles(updatedFiles);
    };

    return(
        <div className="flex flex-col w-[4rem] bg-ide-color items-center justify-around border-l-[1px] border-task-lighter">
            <button
                className="text-red-500"
                onClick={clearCurrentFile}>
                <FontAwesomeIcon icon={faEraser}/>
            </button>
            <button
                className=""
                onClick={() => setAsMain(currentFile.name)}>
                <FontAwesomeIcon icon={faFileCode}/>
            </button>
            <RunButton file={currentFile} setCodeOutput={setCodeOutput} setLoading={setLoading} files={files}/>
        </div>
    )
}

export default Controls;
