import MyEditor from "./components/MyEditor";
import Terminal from "./components/Terminal";
import Controls from "./components/Controls";
import React, {useState} from "react";
import File from "../../../../../models/File";
import {useAuth} from "../../../../../hooks/useAuth";
import {submitSolution} from "../../../../../services/JobOfferService";

interface IdeProps {
    files: File[];
    currentFileIndex: number;
    setFiles: (files: File[]) => void;
    addFile: (name: string, language: string, content?: string) => void;
    setAsMain: (name: string) => void;
}

const Ide: React.FC<IdeProps>= ({files, currentFileIndex, setFiles, addFile, setAsMain, taskId}) => {
    const [output, setCodeOutput] = useState("");
    const [loading, setLoading] = useState(false);

    return (
        <div className="flex flex-col lg:flex-col">
            <div className="flex flex-col w-full">
                <MyEditor
                    files={files}
                    currentFileIndex={currentFileIndex}
                    setFiles={setFiles}
                />
                <div className="flex w-full">
                    <Terminal
                        output={output}
                        loading={loading}
                    />
                    <Controls
                        currentFile={files[currentFileIndex]}
                        files={files}
                        taskId={taskId}
                        setFiles={setFiles}
                        currentFileIndex={currentFileIndex}
                        addFile={addFile}
                        setCodeOutput={setCodeOutput}
                        setAsMain={setAsMain}
                        setLoading={setLoading}
                    />
                </div>
            </div>
        </div>
    )
}

export default Ide;