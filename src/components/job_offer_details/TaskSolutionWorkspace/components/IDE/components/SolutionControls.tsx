import React from "react";
import RunButton from "./RunButton";
import Timer from "./Timer";

const SolutionControls = ({isFeedbackView, userFiles, currentFile, setCodeOutput, setLoading, files, input, taskTimeLimit, taskMemoryLimit, mainFileIndex, taskClosesAt, setIsClosed, submitSolution, isClosed,taskTestFileContent, taskTestDataMap, taskId}) => {
    return (
        <div className="flex gap-3 flex-1">
            <div className="flex w-[60%] items-center gap-3 h-full text-sm justify-center rounded border-task-lighter">
                <div className="flex w-[6rem] h-full rounded">
                    <RunButton
                        file={currentFile}
                        isFeedbackView={isFeedbackView}
                        userFiles={userFiles}
                        setCodeOutput={setCodeOutput}
                        setLoading={setLoading}
                        files={files}
                        userInput={input}
                        timeLimit={taskTimeLimit}
                        memoryLimit={taskMemoryLimit}
                        mainFileIndex={mainFileIndex}
                        taskTestDataMap={taskTestDataMap}
                        taskTestFileContent={taskTestFileContent}
                        taskId={taskId}
                    />
                </div>
                <div className="flex bg-terminal-color h-full flex-1 py-2.5">
                    <Timer taskClosesAt={taskClosesAt} setIsClosed={setIsClosed} />
                </div>
            </div>
            <button
                className="bg-blue-450 text-xs font-semibold rounded w-1/2 text-white hover:bg-blue-500 disabled:bg-terminal-color"
                onClick={submitSolution}
                disabled={isClosed}
            >
                {isFeedbackView ? "SUBMIT FEEDBACK" : "SUBMIT SOLUTION"}
            </button>
        </div>
    );
};

export default SolutionControls;
