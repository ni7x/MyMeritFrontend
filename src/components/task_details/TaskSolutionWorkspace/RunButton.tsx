import React from "react";
import File from "./File";

const RunButton: React.FC<{file:File, setCodeOutput}> = ({file, setCodeOutput}) => {
    const isRunnable = () => {
        switch (file.language) {
            case 'javascript':
                return true;
            case 'css':
            case 'html':
                return false;
            default:
                return false;
        }
    }

    const compileCode = () => {
        if(isRunnable()){
            const content = file.content;
            const language = file.language;
            setCodeOutput("[main.cpp:3:] warning: unused variable 'x'\n");
        }
    }

    return (
        <button className="file-run-button" disabled={!isRunnable()} onClick={compileCode}>
            Run

        </button>
    );
};

export default RunButton;