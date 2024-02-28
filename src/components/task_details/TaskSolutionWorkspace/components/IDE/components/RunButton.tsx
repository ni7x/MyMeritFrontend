import React from "react";
import File from "../../../../../../models/File";
import CodeExecutionOutput from "../../../../../../models/CodeExecutionOutput";

const RunButton: React.FC<{file:File, setCodeOutput: (output: string) => void;}> = ({file, setCodeOutput, setLoading}) => {
    const compileCode = async () => {
        if(file.content.trim() === ""){
            return;
        }

        setLoading(true);
        const output: CodeExecutionOutput = await getToken().then(token => getCompilation(token));
        setLoading(false)

        if(output.compile_output){
            console.log(decodeBase64(output.compile_output));
            setCodeOutput(decodeBase64(output.compile_output));
        }else if(output.stdout){
            setCodeOutput(decodeBase64(output.stdout));
        }else if(output.stderr){
            setCodeOutput(decodeBase64(output.stderr));
        }
    }

    const getToken = async () => {
        try {
            const response = await fetch("http://localhost:8080/token", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    fileName: file.name,
                    fileContentBase64: btoa(file.content)
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

    const decodeBase64 = (base64) => {
        const text = atob(base64);
        const length = text.length;
        const bytes = new Uint8Array(length);
        for (let i = 0; i < length; i++) {
            bytes[i] = text.charCodeAt(i);
        }
        const decoder = new TextDecoder();
        return decoder.decode(bytes);
    }

    return (
        <button className="bg-black border-[2px] border-emerald-500 text-emerald-400 p-1.5 px-5 text-sm font-semibold rounded mr-4"  onClick={compileCode}>
           Run
        </button>
    );
};

export default RunButton;