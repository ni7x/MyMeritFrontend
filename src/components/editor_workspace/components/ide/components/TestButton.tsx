import React from "react";
import MyFile from "../../../../../models/MyFile";
import CodeExecutionOutput from "../../../../../models/CodeExecutionOutput";

import {errorToast} from "../../../../../main";
import {getTestToken} from "../../../../../services/JobOfferService";

const TestButton: React.FC<{isFeedbackView:boolean, file:MyFile, setCodeOutput: (output: CodeExecutionOutput) => void;}> = ({isFeedbackView, originalFiles, files, setCodeOutput, setLoading, task}) => {

    const testCode = async () => {
        setLoading(true);
        try {
            const compiledFiles = isFeedbackView ? originalFiles : files;
            const response = await getTestToken(compiledFiles, task.testFileContentBase64, task.id);
            console.log(response)
        } catch (error) {
            errorToast("Error compiling code");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="flex w-full gap-2">
            <button
                className="text-white py-2.5 w-full font-bold border-[3px] border-orange-400 bg-orange-400 rounded"
                onClick={testCode}
            >
                T
            </button>
        </div>

    );
};

export default TestButton;
