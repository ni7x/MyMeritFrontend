// import React from "react";

const SolutionControls = ({submitButton, runButton, timer}) => {
    return (
        <div className="flex gap-3 flex-1">
            <div className="flex items-center gap-3 h-full text-sm justify-center rounded border-task-lighter">
                <div className="flex w-[3rem] h-full rounded">
                    {runButton}
                </div>
                {timer &&
                    <div className="flex bg-terminal-color h-full py-2.5 px-3.5">
                    {timer}
                </div>}
            </div>
                {submitButton}
        </div>
    );
};

export default SolutionControls;
