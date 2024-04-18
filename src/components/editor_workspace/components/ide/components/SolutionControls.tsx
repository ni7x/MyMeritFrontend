import React from "react";

const SolutionControls = ({submitButton, runButton, timer, testButton}) => {
    return (
        <div className="flex gap-3 flex-1">
            <div className="flex w-[60%] items-center gap-3 h-full text-sm justify-center rounded border-task-lighter">
                <div className="flex w-[6rem] h-full rounded">
                    {runButton}
                    {testButton}
                </div>
                <div className="flex bg-terminal-color h-full flex-1 py-2.5">
                    {timer}
                </div>
            </div>
            {submitButton}
        </div>
    );
};

export default SolutionControls;
