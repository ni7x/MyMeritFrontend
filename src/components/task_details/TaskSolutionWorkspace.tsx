import React, { useState } from "react";
import Editor from '@monaco-editor/react';
import File from "./TaskSolutionWorkspace/File";
import FileChangeButton from "./TaskSolutionWorkspace/FileChangeButton";
import AddFileButton from "./TaskSolutionWorkspace/AddFileButton";
import RunButton from "./TaskSolutionWorkspace/RunButton";
import "./task_solution_workspace.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileUpload } from '@fortawesome/free-solid-svg-icons';

const TaskSolutionWorkspace: React.FC<{ taskId: string }> = ({ taskId }) => {
    const [output, setOutput] = useState("");
    const [files, setFiles] = useState<File[]>([new File("index.js", "javascript", "")]);
    const [currentFileIndex, setCurrentFileIndex] = useState<number>(0);
    const currentFile = files[currentFileIndex];

    const addFile = (name: string, language: string) => {
        if (!getFileByName(name)) {
            const newFile = new File(name, language, "");
            setFiles(prevFiles => [...prevFiles, newFile]);
            setCurrentFileIndex(files.length);
        } else {
            console.log("This file already exists.");
        }
    };

    const addLocalFile = (name: string, language: string, content: string) => {
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

    const getFileByName = (name: string) => {
        return files.find(file => file.name === name);
    };

    const setCurrentFileByName = (name: string) => {
        const index = files.findIndex(file => file.name === name);
        setCurrentFileIndex(index);
    };

    const handleEditorChange = (value: string) => {
        const updatedFiles = [...files];
        updatedFiles[currentFileIndex].content = value;
        setFiles(updatedFiles);
    };

    const clearCurrentFile = () => {
        const updatedFiles = [...files];
        updatedFiles[currentFileIndex].content = "";
        setFiles(updatedFiles);
    };

    const addLocalFiles = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                const fileContent = event.target?.result as string;
                const fileName = file.name;
                const fileLanguage = "plaintext";
                addLocalFile(fileName, fileLanguage, fileContent);
            };
            reader.readAsText(file);
        }
    };

    const submitSolution = () => {
        files.forEach(file =>
            console.log(file.name + "\n\n" + file.language + "\n\n" + file.content)
        );
    };

    function handleEditorValidation(markers) {
        markers.forEach(marker => console.log('onValidate:', marker.message));
    }

    return (
        <div className="task-solution-workspace">
            {currentFile ? (
                <div className="task-solution-workspace-wrapper">
                    <div className="top-panel">
                        {files.map(file =>
                            <FileChangeButton
                                key={file.name}
                                name={file.name}
                                setCurrentFileByName={setCurrentFileByName}
                                currentFileName={currentFile.name}
                            />
                        )}
                        <AddFileButton addFile={addFile} />
                    </div>
                    <div className="ide-wrapper">
                        <div className="ide">
                            <div className="editor">
                                <Editor
                                    height="60vh"
                                    theme="vs-dark"
                                    path={currentFile.name}
                                    defaultLanguage={currentFile.language}
                                    value={currentFile.content}
                                    onChange={handleEditorChange}
                                    onValidate={handleEditorValidation}
                                    options={{
                                        minimap: { enabled: false },
                                        overviewRulerBorder: false,
                                        hideCursorInOverviewRuler: true,
                                    }}
                                />
                                <div className="terminal">
                                    <div className="output">
                                        {output}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="controls">
                            <div>
                                <RunButton file={currentFile} setCodeOutput={setOutput}/>
                                <button className="clear" onClick={clearCurrentFile}>Clear</button>
                                <label htmlFor="fileInput" className="add-local-file">
                                    <FontAwesomeIcon icon={faFileUpload} />
                                    <input id="fileInput" type="file" onChange={addLocalFiles} />
                                </label>
                            </div>
                            <button className="submit-solution" onClick={submitSolution}>Submit</button>
                        </div>
                    </div>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default TaskSolutionWorkspace;
