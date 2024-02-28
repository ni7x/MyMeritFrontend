import React from "react";

const Terminal:React.FC<{output:string}> = ({output, loading}) => {
    return(
        <div className="relative bg-task-bck border-t-[1px] border-solid border-[#767880] h-40 overflow-x-auto p-5">
            <pre>
                {loading ?  "Loading please wait..." : output }
            </pre>
        </div>
    )
}

export default Terminal;