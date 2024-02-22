import React from "react";
import File from "../../../../../../models/File";
import {isRunnable} from "../../../fileUtils";

const RunButton: React.FC<{file:File, setCodeOutput: (output: string) => void;}> = ({file, setCodeOutput}) => {


    const compileCode = () => {
        if(isRunnable(file)){
            const content = file.content;
            const language = file.language;
            setCodeOutput("[main.cpp:3:] warning: unused variable 'x'\n");
        }
    }

    return (
        <button className="file-run-button" disabled={!isRunnable(file)} onClick={compileCode}>
            Run
        </button>
    );
};

export default RunButton;