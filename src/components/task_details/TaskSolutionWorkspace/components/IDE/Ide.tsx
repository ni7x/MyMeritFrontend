import MyEditor from "./components/MyEditor";
import Terminal from "./components/Terminal";
import Controls from "./components/Controls";
import React, {useState} from "react";
import File from "../../../../../models/File";

interface IdeProps {
    files: File[];
    currentFileIndex: number;
    setFiles: (files: File[]) => void;
    addFile: (name: string, language: string, content?: string) => void;
    setAsMain: (name: string) => void;
}

const Ide: React.FC<IdeProps>= ({files, currentFileIndex, setFiles, addFile, setAsMain, taskId}) => {
    const [output, setCodeOutput] = useState("");

    return (
        <div className="flex flex-col lg:flex-row">
            <div className="w-full">
                <MyEditor files={files}
                          currentFileIndex={currentFileIndex}
                          setFiles={setFiles}
                />
                <Terminal output={output}/>
                <Controls
                    currentFile={files[currentFileIndex]}
                    files={files}
                    taskId={taskId}
                    setFiles={setFiles}
                    currentFileIndex={currentFileIndex}
                    addFile={addFile}
                    setCodeOutput={setCodeOutput}
                    setAsMain={setAsMain}
                />

            </div>
        </div>
    )
}

export default Ide;