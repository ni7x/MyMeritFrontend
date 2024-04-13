import EditorAndViewer from "./components/EditorAndViewer";
import TerminalOutput from "./components/TerminalOutput";
import React, {useState} from "react";
import MyFile from "../../../../../models/MyFile";
import TerminalInput from "./components/TerminalInput";
import CodeExecutionOutput from "../../../../../models/CodeExecutionOutput";
import SolutionControls from "./components/SolutionControls";
import FileControls from "./components/FileControls";

interface IdeProps {
    files: MyFile[];
    currentFileIndex: number;
    setFiles: (files: MyFile[]) => void;
}

const Ide: React.FC<IdeProps>= ({isFeedbackView, userFiles, files, currentFileIndex, setFiles, submitSolution, setAsMain, mainFileIndex, isEditable, task}) => {
    const [output, setCodeOutput] = useState<CodeExecutionOutput>(null);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);
    const [isMaxSize, setIsMaxSize] = useState(false);
    const [isClosed, setIsClosed] = useState(false);
    const currentFile = files[currentFileIndex];

    return (
        <div className="flex flex-col md:flex-col flex-grow flex-1 gap-3 h-full max-h-[calc(100%-40px)] ">
                <div className="min-h-[40vh] flex-1">
                    <EditorAndViewer
                        files={files}
                        userFiles={userFiles}
                        currentFileIndex={currentFileIndex}
                        setFiles={setFiles}
                        isMaxSize={isMaxSize}
                        isEditable={isEditable}
                        isFeedbackView={isFeedbackView}
                    />
                    <FileControls
                        currentFile={currentFile}
                        currentFileIndex={currentFileIndex}
                        mainFileIndex={mainFileIndex}
                        setIsMaxSize={setIsMaxSize}
                        setAsMain={setAsMain}
                        isMaxSize={isMaxSize}
                    />
                </div>
                <div className={"flex w-full gap-3 h-[40%] flex-col md:flex-row " + (isMaxSize ? " flex lg:hidden " : " flex")}>
                    <TerminalOutput
                        output={output}
                        loading={loading}
                        setOutput={setCodeOutput}
                    />
                    <div className="flex md:flex-col flex-col-reverse w-full md:w-1/2 gap-3 h-full">
                        <SolutionControls
                            currentFile={currentFile}
                            setCodeOutput={setCodeOutput}
                            setLoading={setLoading}
                            files={files}
                            input={input}
                            mainFileIndex={mainFileIndex}
                            setIsClosed={setIsClosed}
                            isFeedbackView={isFeedbackView}
                            userFiles={userFiles}
                            submitSolution={submitSolution}
                            isClosed={isClosed}
                            task={task}
                        />
                        <TerminalInput
                            setInput={setInput}
                            input={input}
                        />
                    </div>
                </div>
        </div>
    )
}

export default Ide;