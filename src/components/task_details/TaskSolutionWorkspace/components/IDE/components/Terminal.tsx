import React from "react";

const Terminal:React.FC<{output:string}> = ({output}) => {
    return(
        <div className="terminal">
            <div className="output">
                {output}
            </div>
        </div>
    )
}

export default Terminal;