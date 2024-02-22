import RunButton from "./RunButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileUpload } from '@fortawesome/free-solid-svg-icons';
import React from "react";
import File from "../../../../../../models/File";

interface ControlsProps {
    files: File[];
    currentFileIndex: number;
    addFile: (name: string, language: string, content?: string) => void;
    setCodeOutput: (output: string) => void;
    setFiles: (files: File[]) => void;
}

const Controls: React.FC<ControlsProps>  = ({files, currentFileIndex, addFile, setCodeOutput, setFiles}) => {
    const currentFile = files[currentFileIndex];

    const submitSolution = () => {
        files.forEach(file =>
            console.log(file.name + "\n\n" + file.language + "\n\n" + file.content)
        );
    };


    const clearCurrentFile = () => {
        const updatedFiles = [...files];
        updatedFiles[currentFileIndex].content = "";
        setFiles(updatedFiles);
    };

    return(
        <div className="controls flex flex-row lg:flex-col w-full py-5 lg:w-[7%]">
            <div className="flex flex-row lg:flex-col ">
                <RunButton file={currentFile} setCodeOutput={setCodeOutput}/>
                <button className="clear" onClick={clearCurrentFile}>Clear</button>

            </div>
            <button className="submit-solution" onClick={submitSolution}>Submit</button>
        </div>
    )
}

export default Controls;