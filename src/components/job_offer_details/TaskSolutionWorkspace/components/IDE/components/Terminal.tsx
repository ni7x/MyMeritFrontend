import React from "react";
import CodeExecutionOutput from "../../../../../../models/CodeExecutionOutput";
import {decodeBase64} from "../../../fileUtils";

const Terminal:React.FC<{output:CodeExecutionOutput}> = ({output, loading}) => {


    //[{"id":1,"description":"In Queue"},
    // {"id":2,"description":"Processing"},
    // {"id":3,"description":"Accepted"},
    // {"id":4,"description":"Wrong Answer"},
    // {"id":5,"description":"Time Limit Exceeded"},
    // {"id":6,"description":"Compilation Error"},
    // {"id":7,"description":"Runtime Error (SIGSEGV)"},{"id":8,"description":"Runtime Error (SIGXFSZ)"},{"id":9,"description":"Runtime Error (SIGFPE)"},{"id":10,"description":"Runtime Error (SIGABRT)"},{"id":11,"description":"Runtime Error (NZEC)"},{"id":12,"description":"Runtime Error (Other)"},{"id":13,"description":"Internal Error"},{"id":14,"description":"Exec Format Error"}]

    console.log(decodeBase64(output.stdout))
    console.log(output)
    function renderOutput(status) {
        if (status === 1) {
            return "In queue";
        } else if (status === 2) {
            return "Processing";
        } else if (status === 3) {
            if(output.stdout)
                return decodeBase64(output.stdout);
        } else if (status === 4) {
            return "Wrong answer";
        } else if (status === 5) {
            return "Time Limit Exceeded";
        } else if (status === 6) {
            if(output.compile_output)
                return <span className="text-red-500">{decodeBase64(output.compile_output)}</span>
        } else if (status >= 7){
            if(output.stderr)
                return <span className="text-red-500">{decodeBase64(output.stderr)}</span>
        } else {
            return null;
        }
    }

    return(
        <div className="relative bg-terminal-color flex-1 h-[12rem] overflow-x-auto p-2 ">
            <p className="text-task-lighter text-xs font-normal mb-1">OUTPUT</p>
            <pre className="leading-[1.25rem] font-sans font-normal text-sm">
                {loading ?  "Loading please wait..." : renderOutput(output?.status?.id)
                }
            </pre>
        </div>
    )
}

export default Terminal;
