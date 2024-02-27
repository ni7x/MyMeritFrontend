import RunButton from "./RunButton";
import React from "react";
import File from "../../../../../../models/File";

interface ControlsProps {
    files: File[];
    currentFileIndex: number;
    addFile: (name: string, language: string, content?: string) => void;
    setCodeOutput: (output: string) => void;
    setFiles: (files: File[]) => void;
    setAsMain: (name: string) => void;
}

const Controls: React.FC<ControlsProps>  = ({files, currentFileIndex, addFile, setCodeOutput, setFiles, setAsMain}) => {
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
        <div className="flex flex-row  w-[100%] py-3 px-3 bg-[#1d1e25]  items-center justify-end ">
            <div className="flex flex-row gap-3 items-center justify-between flex-wrap lg:w-[65%]">
                <div className="flex flex-row items-center">
                    <button className="bg-gray-600 p-1.5 px-5 text-sm font-semibold rounded border-2 border-gray-600 mr-3 w-auto  text-nowrap" onClick={() => setAsMain(currentFile.name)}>Set as main</button>
                    <button className="bg-orange-400 p-1.5 px-5 text-sm font-semibold rounded border-2 border-orange-400 mr-3" onClick={clearCurrentFile}>Clear</button>
                    <RunButton file={currentFile} setCodeOutput={setCodeOutput}/>
                </div>
                <button className="bg-blue-500 p-1.5 px-5 text-sm font-medium rounded border-2 border-blue-500" onClick={submitSolution}>Submit</button>
            </div>
        </div>
    )
}

export default Controls;