import MyEditor from "./components/MyEditor";
import TerminalOutput from "./components/TerminalOutput";
import React, {useEffect, useState} from "react";
import File from "../../../../../models/File";
import TerminalInput from "./components/TerminalInput";
import CodeExecutionOutput from "../../../../../models/CodeExecutionOutput";
import RunButton from "./components/RunButton";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faClock} from "@fortawesome/free-regular-svg-icons";
import Timer from "./components/Timer";

interface IdeProps {
    files: File[];
    currentFileIndex: number;
    setFiles: (files: File[]) => void;
    addFile: (name: string, language: string, content?: string) => void;
    setAsMain: (name: string) => void;

}

const Ide: React.FC<IdeProps>= ({files, currentFileIndex, setFiles, submitSolution, taskClosesAt, taskMemoryLimit, taskTimeLimit}) => {
    const [output, setCodeOutput] = useState<CodeExecutionOutput>(null);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);
    const currentFile = files[currentFileIndex];

    return (
        <div className="flex flex-col lg:flex-col flex-grow flex-1 gap-3">
                <div className="flex-1">
                    <MyEditor
                        files={files}
                        currentFileIndex={currentFileIndex}
                        setFiles={setFiles}
                    />
                </div>

                <div className="flex w-full gap-3 h-[40%] box-border">
                    <TerminalOutput
                        output={output}
                        loading={loading}
                        setOutput={setCodeOutput}
                    />

                    <div className="flex flex-col w-1/2 gap-3 h-full">
                        <div className="flex gap-3 flex-1">
                            <div className="flex w-[60%] items-center gap-3 h-full text-sm  justify-center rounded border-task-lighter">
                                <div className="flex flex-1 h-full rounded ">
                                    <RunButton
                                        file={currentFile}
                                        setCodeOutput={setCodeOutput}
                                        setLoading={setLoading}
                                        files={files}
                                        userInput={input}
                                        timeLimit={taskTimeLimit}
                                        memoryLimit={taskMemoryLimit}
                                    />
                                </div>
                                <Timer
                                    taskClosesAt={taskClosesAt}
                                />
                            </div>
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