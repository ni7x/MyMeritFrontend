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

    const addLocalFile = (event) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                const fileContent = event.target?.result as string;
                const fileName = file.name;
                const fileLanguage = "plaintext";
                addFile(fileName, fileLanguage, fileContent);
            };
            reader.readAsText(file);
        }
    };

    const clearCurrentFile = () => {
        const updatedFiles = [...files];
        updatedFiles[currentFileIndex].content = "";
        setFiles(updatedFiles);
    };

    return(
        <div className="controls">
            <div>
                <RunButton file={currentFile} setCodeOutput={setCodeOutput}/>
                <button className="clear" onClick={clearCurrentFile}>Clear</button>
                <label htmlFor="fileInput" className="add-local-file">
                    <FontAwesomeIcon icon={faFileUpload} />
                    <input id="fileInput" type="file" onChange={addLocalFile} />
                </label>
            </div>
            <button className="submit-solution" onClick={submitSolution}>Submit</button>
        </div>
    )
}

export default Controls;