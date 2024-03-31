import React from "react";
import MyFile from "../../../../../../models/MyFile";
import CodeExecutionOutput from "../../../../../../models/CodeExecutionOutput";
import {generateEncodedZip} from "../../../utils/fileUtils";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlay} from "@fortawesome/free-solid-svg-icons";

const RunButton: React.FC<{file:MyFile, setCodeOutput: (output: CodeExecutionOutput) => void;}> = ({file, files, setCodeOutput, setLoading, userInput, timeLimit, memoryLimit}) => {

    const compileCode = async () => {
        setLoading(true);
        const output: CodeExecutionOutput = await getToken().then(token => getCompilation(token));
        setLoading(false)
        setCodeOutput(output);
    }

    const getToken =  async () => {
        try {
            const stdin = userInput && userInput.trim().length > 0 ? btoa(userInput) : null;
            const response = await fetch("http://localhost:8080/token", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    fileName: file.name,
                    fileContentBase64: await generateEncodedZip(files),
                    stdin : stdin,
                    timeLimit: timeLimit,
                    memoryLimit: memoryLimit
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
            className="text-emerald-400 py-2.5 w-full border-[3px] border-emerald-400 rounded hover:bg-emerald-400 hover:text-black hover:duration-150 "
            onClick={compileCode}
        >
           <FontAwesomeIcon icon={faPlay}/>
        </button>
    );
};

export default RunButton;
