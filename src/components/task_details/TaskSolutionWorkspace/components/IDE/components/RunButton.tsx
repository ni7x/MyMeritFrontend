import React from "react";
import File from "../../../../../../models/File";
import CodeExecutionOutput from "../../../../../../models/CodeExecutionOutput";
import {generateEncodedZip} from "../../../fileUtils";

const RunButton: React.FC<{file:File, setCodeOutput: (output: CodeExecutionOutput) => void;}> = ({file, files, setCodeOutput, setLoading}) => {
    const compileCode = async () => {
        setLoading(true);
        const output: CodeExecutionOutput = await getToken().then(token => getCompilation(token));
        setLoading(false)
        setCodeOutput(output);
    }


    const getToken =  async () => {
        try {
            const response = await fetch("http://localhost:8080/token", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    fileName: file.name,
                    fileContentBase64: await generateEncodedZip(files)
                })
            });
            return await response.text();
        } catch (error) {
            console.error(error);
        }
    }

    const getCompilation = async (token:string) => {
        console.log(token)
        try {
            const response = await fetch("http://localhost:8080/token/" + token, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                }
            });
            return await response.json() as CodeExecutionOutput;
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <button
            className="bg-black border-[2px] border-emerald-500 text-emerald-400 p-1.5 px-5 text-sm font-semibold rounded mr-4"
            onClick={compileCode}>
           Run
        </button>
    );
};

export default RunButton;
