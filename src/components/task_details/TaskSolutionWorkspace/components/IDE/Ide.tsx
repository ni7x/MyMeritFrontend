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
}

const Ide: React.FC<IdeProps>= ({files, currentFileIndex, setFiles, addFile}) => {
    const [output, setCodeOutput] = useState("");

    return (
        <div className="ide">
            <div className="editor">
                <MyEditor files={files}
                          currentFileIndex={currentFileIndex}
                          setFiles={setFiles}
                />
                <Terminal output={output}/>
            </div>
            <Controls
                currentFile={files[currentFileIndex]}
                files={files}
                setFiles={setFiles}
                currentFileIndex={currentFileIndex}
                addFile={addFile}
                setCodeOutput={setCodeOutput}
            />
        </div>
    )
}

export default Ide;