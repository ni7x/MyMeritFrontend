import RunButton from "./RunButton";
import React, {useEffect, useState} from "react";
import File from "../../../../../../models/File";
import CodeExecutionOutput from "../../../../../../models/CodeExecutionOutput";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faClock} from "@fortawesome/free-regular-svg-icons";

interface ControlsProps {
    files: File[];
    currentFileIndex: number;
    addFile: (name: string, language: string, content?: string) => void;
    setCodeOutput: (output: CodeExecutionOutput) => void;
    setFiles: (files: File[]) => void;
    setAsMain: (name: string) => void;
}

const Controls: React.FC<ControlsProps>  = ({files, currentFileIndex, setLoading, setCodeOutput, taskClosesAt, userInput}) => {
    const currentFile = files[currentFileIndex];
    const [timeRemaining, setTimeRemaining] = useState("");

    useEffect(() => {
        const updateTimeRemaining = () => {
            const differenceInSeconds = Math.ceil(
                (new Date(taskClosesAt) - new Date()) / 1000
            );

            if (differenceInSeconds <= 0) {
                clearInterval(intervalId);
                setTimeRemaining("Closed");
            } else {
                const hours = Math.floor(differenceInSeconds / 3600);
                const minutes = Math.floor((differenceInSeconds % 3600) / 60);
                const seconds = differenceInSeconds % 60;

                setTimeRemaining(`${hours < 10 ? "0" : ""}${hours}:${minutes < 10 ? "0" : ""}${minutes}:${seconds < 10 ? "0" : ""}${seconds}`);
            }
        };

        updateTimeRemaining();

        const intervalId = setInterval(updateTimeRemaining, 1000);

        return () => clearInterval(intervalId);
    }, [taskClosesAt]);


    return(
        <div className="flex w-[60%] items-center gap-3 h-full text-sm  justify-center rounded border-task-lighter">
            <div className="flex flex-1 h-full rounded ">
                <RunButton
                    file={currentFile}
                    setCodeOutput={setCodeOutput}
                    setLoading={setLoading}
                    files={files}
                    userInput={userInput}
                />
            </div>
            <div className="flex gap-5 w-[70%] bg-terminal-color rounded h-full justify-center items-center font-medium">
                <p>
                    <FontAwesomeIcon icon={faClock} className="mr-1 text-slate-200"/> {timeRemaining}
                </p>
            </div>
        </div>
    )
}

export default Controls;
