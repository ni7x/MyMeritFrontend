import MyEditor from "./components/MyEditor";
import TerminalOutput from "./components/TerminalOutput";
import Controls from "./components/Controls";
import React, {useState} from "react";
import File from "../../../../../models/File";
import TerminalInput from "./components/TerminalInput";
import CodeExecutionOutput from "../../../../../models/CodeExecutionOutput";

interface IdeProps {
    files: File[];
    currentFileIndex: number;
    setFiles: (files: File[]) => void;
    addFile: (name: string, language: string, content?: string) => void;
    setAsMain: (name: string) => void;
}

const Ide: React.FC<IdeProps>= ({files, currentFileIndex, setFiles, addFile, setAsMain, taskId, submitSolution, taskClosesAt}) => {
    const [output, setCodeOutput] = useState<CodeExecutionOutput>(null);
    const [input, setInput] = useState("");

    const [loading, setLoading] = useState(false);

    return (
        <div className="flex flex-col lg:flex-col flex-grow flex-1 gap-3">
                <div className="flex-1">
                    <MyEditor
                        files={files}
                        currentFileIndex={currentFileIndex}
                        setFiles={setFiles}
                    />
                </div>

                <div className="flex w-full gap-3 h-[40%]">
                    <TerminalOutput
                        output={output}
                        loading={loading}
                    />

                    <div className="flex flex-col w-1/2 gap-3 h-full">
                        <div className="flex gap-3 flex-1">
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
                                userInput={input}
                                taskClosesAt={taskClosesAt}
                            />
                            <button
                                className="bg-blue-450 text-xs font-semibold rounded w-1/2 text-white"
                                onClick={submitSolution}
                            >
                                SUBMIT SOLUTION
                            </button>
                        </div>
                        <div className="flex h-full">
                            <TerminalInput
                                setInput={setInput}
                                input={input}
                            />
                        </div>
                    </div>
                </div>
        </div>
    )
}

export default Ide;