import React from "react";
import MyFile from "../../../../../models/MyFile";
import CodeExecutionOutput from "../../../../../models/CodeExecutionOutput";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlay} from "@fortawesome/free-solid-svg-icons";
import {errorToast} from "../../../../../main";
import {getCompilation, getToken} from "../../../../../services/JobOfferService";

const RunButton: React.FC<{isFeedbackView:boolean, file:MyFile, setCodeOutput: (output: CodeExecutionOutput) => void;}> = ({isFeedbackView, originalFiles, file, files, setCodeOutput, setLoading, userInput,  mainFileIndex, task}) => {

    const compileCode = async () => {
        setLoading(true);
        try {
            const compiledFiles = isFeedbackView ? originalFiles : files;

            const token = await getToken(userInput, compiledFiles, mainFileIndex, file, task.timeLimit, task.memoryLimit);
            if (!token) {
                return;
            }
            const output = await getCompilation(token);
            if(output){
                setCodeOutput(output);
            }
        } catch (error) {
            errorToast("Error compiling code" + error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div class="flex w-full gap-2">
            <button
                className="text-emerald-400 py-2.5 w-full border-[3px] border-emerald-400 rounded hover:bg-emerald-400 hover:text-black hover:duration-150 "
                onClick={compileCode}
            >
                <FontAwesomeIcon icon={faPlay}/>
            </button>
        </div>

    );
};

export default RunButton;
