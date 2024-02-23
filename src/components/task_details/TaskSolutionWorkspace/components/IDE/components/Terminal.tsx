import React, {useState} from "react";

const Terminal:React.FC<{output:string}> = ({output}) => {

    return(
        <div className="relative bg-task-bck border-t-[1px] border-solid border-[#767880] h-40 overflow-x-auto p-5">
            <div>
                {output}
            </div>
        </div>
    )
}

export default Terminal;