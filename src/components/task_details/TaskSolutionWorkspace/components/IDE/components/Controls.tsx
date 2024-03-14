import RunButton from "./RunButton";
import React  from "react";
import File from "../../../../../../models/File";
import CodeExecutionOutput from "../../../../../../models/CodeExecutionOutput";
import {getHomeJobOffers, submitSolution} from "../../../../../../services/JobOfferService";
import {useAuth} from "../../../../../../hooks/useAuth";

interface ControlsProps {
    files: File[];
    currentFileIndex: number;
    addFile: (name: string, language: string, content?: string) => void;
    setCodeOutput: (output: CodeExecutionOutput) => void;
    setFiles: (files: File[]) => void;
    setAsMain: (name: string) => void;
}

const Controls: React.FC<ControlsProps>  = ({files, currentFileIndex, setLoading, setCodeOutput, setFiles, setAsMain, taskId}) => {
    const currentFile = files[currentFileIndex];
    const {authToken} = useAuth();

    const submit = () => {
        const fetchData = async () => {
            try {
                if(authToken){
                    const response = await submitSolution(taskId, files, authToken);
                    if (response.ok) {
                        console.log(response)
                    }
                }else{
                    console.log("no token provided")
                }


            } catch (error) {
                console.error("Error fetching tasks:", error);
            }
        };

        fetchData();


    };


    const clearCurrentFile = () => {
        const updatedFiles = [...files];
        updatedFiles[currentFileIndex].content = "";
        setFiles(updatedFiles);
    };

    return(
        <div className="flex flex-row  w-[100%] py-3 px-3 bg-[#1d1e25]  items-center justify-end ">
            <div className="flex flex-row gap-3 items-center justify-between flex-wrap lg:w-[70%]">
                <div className="flex flex-row items-center">
                    <button
                        className="bg-gray-600 p-1.5 px-5 text-sm font-semibold rounded border-2 border-gray-600 mr-3 w-auto  text-nowrap"
                        onClick={() => setAsMain(currentFile.name)}>
                        Set as main
                    </button>
                    <button
                        className="bg-orange-400 p-1.5 px-5 text-sm font-semibold rounded border-2 border-orange-400 mr-3"
                        onClick={clearCurrentFile}>
                        Clear
                    </button>
                    <RunButton file={currentFile} setCodeOutput={setCodeOutput} setLoading={setLoading} files={files}/>
                </div>
                <button className="bg-blue-500 p-1.5 px-5 text-sm font-medium rounded border-2 border-blue-500" onClick={submit}>Submit</button>
            </div>
        </div>
    )
}

export default Controls;
