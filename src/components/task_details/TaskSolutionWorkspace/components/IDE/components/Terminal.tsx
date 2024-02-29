import React from "react";
import CodeExecutionOutput from "../../../../../../models/CodeExecutionOutput";

const Terminal:React.FC<{output:CodeExecutionOutput}> = ({output, loading}) => {

    const decodeBase64 = (base64) => { //uzywanie samego atob nie konwerowalo wszystkich znakow specialnych ascii
        const text = atob(base64);
        const length = text.length;
        const bytes = new Uint8Array(length);
        for (let i = 0; i < length; i++) {
            bytes[i] = text.charCodeAt(i);
        }
        const decoder = new TextDecoder();
        return decoder.decode(bytes);
    }

    //[{"id":1,"description":"In Queue"},
    // {"id":2,"description":"Processing"},
    // {"id":3,"description":"Accepted"},
    // {"id":4,"description":"Wrong Answer"},
    // {"id":5,"description":"Time Limit Exceeded"},
    // {"id":6,"description":"Compilation Error"},
    // {"id":7,"description":"Runtime Error (SIGSEGV)"},{"id":8,"description":"Runtime Error (SIGXFSZ)"},{"id":9,"description":"Runtime Error (SIGFPE)"},{"id":10,"description":"Runtime Error (SIGABRT)"},{"id":11,"description":"Runtime Error (NZEC)"},{"id":12,"description":"Runtime Error (Other)"},{"id":13,"description":"Internal Error"},{"id":14,"description":"Exec Format Error"}]

    console.log(output)
    function renderOutput(status) {
        if (status === 1) {
            return "In queue";
        } else if (status === 2) {
            return "Processing";
        } else if (status === 3) {
            return decodeBase64(output.stdout);
        } else if (status === 4) {
            return "Wrong answer";
        } else if (status === 5) {
            return "Time Limit Exceeded";
        } else if (status === 6) {
            return <span className="text-red-500">{decodeBase64(output.compile_output)}</span>
        } else if (status >= 7){
            return <span className="text-red-500">{decodeBase64(output.stderr)}</span>
        } else {
            return null;
        }
    }

    return(
        <div className="relative bg-terminal-color border-t-[1px] border-solid border-[#767880] h-40 overflow-x-auto p-5">
            <pre className="leading-6 font-sans">
                {loading ?  "Loading please wait..." : renderOutput(output?.status?.id)
                }
            </pre>
        </div>
    )
}

export default Terminal;