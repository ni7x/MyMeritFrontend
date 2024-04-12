import React from "react";
import MyFile from "../../../../../../models/MyFile";
import CodeExecutionOutput from "../../../../../../models/CodeExecutionOutput";
import {generateEncodedZip} from "../../../utils/fileUtils";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlay} from "@fortawesome/free-solid-svg-icons";
import {errorToast} from "../../../../../../main";
import {getCompilation, getToken} from "../../../../../../services/JobOfferService";

const RunButton: React.FC<{isFeedbackView:boolean, file:MyFile, setCodeOutput: (output: CodeExecutionOutput) => void;}> = ({isFeedbackView, userFiles, file, files, setCodeOutput, setLoading, userInput, timeLimit, memoryLimit, mainFileIndex}) => {

    const compileCode = async () => {
        setLoading(true);
        try {
            const compiledFiles = isFeedbackView ? userFiles : files;
            console.log(compiledFiles)
            const token = await getToken(userInput, compiledFiles, mainFileIndex, file, timeLimit, memoryLimit);
            if (!token) {
                return;
            }
            const output = await getCompilation(token);
            if(output){
                setCodeOutput(output);
            }
        } catch (error) {
            errorToast("Error compiling code");
        } finally {
            setLoading(false);
        }
    }

    return (
        <button
            className="text-emerald-400 py-2.5 w-full border-[3px] border-emerald-400 rounded hover:bg-emerald-400 hover:text-black hover:duration-150 "
            onClick={compileCode}
        >
           <FontAwesomeIcon icon={faPlay}/>
        </button>
    );
};

export default RunButton;
