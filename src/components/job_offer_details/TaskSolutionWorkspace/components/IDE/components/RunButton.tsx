import React from "react";
import MyFile from "../../../../../../models/MyFile";
import CodeExecutionOutput from "../../../../../../models/CodeExecutionOutput";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlay} from "@fortawesome/free-solid-svg-icons";
import {errorToast} from "../../../../../../main";
import {getCompilation, getTestToken, getToken} from "../../../../../../services/JobOfferService";

const RunButton: React.FC<{isFeedbackView:boolean, file:MyFile, setCodeOutput: (output: CodeExecutionOutput) => void;}> = ({isFeedbackView, userFiles, file, files, setCodeOutput, setLoading, userInput,  mainFileIndex, task}) => {

    const compileCode = async () => {
        setLoading(true);
        try {
            const compiledFiles = isFeedbackView ? userFiles : files;
            console.log(compiledFiles)
            const token = await getToken(userInput, compiledFiles, mainFileIndex, file, task.timeLimit, task.memoryLimit);
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

    const testCode = async () => {
        setLoading(true);
        try {
            const compiledFiles = isFeedbackView ? userFiles : files;
            const response = await getTestToken(compiledFiles, task.testFileContentBase64, task.id);

            console.log(response)
        } catch (error) {
            errorToast("Error compiling code");
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
            <button
                className="text-white py-2.5 w-full font-bold border-[3px] border-orange-400 bg-orange-400 rounded"
                onClick={testCode}
            >
                T
            </button>
        </div>

    );
};

export default RunButton;
