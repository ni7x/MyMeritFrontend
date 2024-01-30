import React, {useEffect, useState} from "react";
import Editor from '@monaco-editor/react';
import File from "./TaskSolutionWorkspace/File";
import FileChangeButton from "./TaskSolutionWorkspace/FileChangeButton";
import AddFileButton from "./TaskSolutionWorkspace/AddFileButton";
import "./TaskSolutionWorkspace/task_solution_workspace.css"

const TaskSolutionWorkspace: React.FC<{taskId: string}> = ({taskId}) => {
    let [content, setContent] = useState<string>("");
    let [files, setFiles] = useState<File[]>([new File("index.js", "javascript", "")]);
    let [currentFile, setCurrentFile] = useState<File>(files[0])

    const addFile = (name: string, language: string) => {
        if(getFileByName(name) == undefined){
            const newFile = new File(name, language, "");
            setFiles(prevFiles => [...prevFiles, newFile]);
            setCurrentFile(newFile);
        }else{
            console.log("This file already exists.")
        }
    };

    const removeFile = (name: string) => {
        setFiles(prevFiles => prevFiles.filter(file => file.name !== name));
    };

    const getFileByName = (name: string) => {
        return files.find(file => file.name === name);
    };

    const setCurrentFileByName = (name:string) => {
        setCurrentFile(getFileByName(name));
    }

    const handleEditorChange = (value) =>{
        setContent(value);
        currentFile.content = value;
    }


    const submitSolution = () => {
        files.forEach((file)=>{
            console.log( file.name + "\n\n" + file.language + "\n\n" + file.content)
        })

    }

    function handleEditorValidation(markers) {
        markers.forEach((marker) => console.log('onValidate:', marker.message));
    }

    if(currentFile){
        return (
            <div className="task-solution-workspace" >
                <div className="top-panel">
                    {files.map((file)=>{
                        return <FileChangeButton key={file.name} name={file.name} setCurrentFileByName={(name) => setCurrentFileByName(name)} currentFileName={currentFile?.name}/>
                    })}

                    <AddFileButton addFile={(name, language) => addFile(name, language)}/>
                </div>

                <div className="editor">
                    <Editor
                        height="50vh"
                        theme="vs-dark"
                        path={currentFile.name}
                        defaultLanguage={currentFile.language}
                        defaultValue={currentFile.content}
                        onChange={handleEditorChange}
                        onValidate={handleEditorValidation}
                    />
                </div>

                <div className="submit-solution">
                    <button onClick={submitSolution}>Submit solution</button>
                </div>
                todo remove, better modal, run, output, addfiles from pc, diffrent editor style
           </div>
        );
    }else{
        return <p>Loading...</p>
    }

};

export default TaskSolutionWorkspace;