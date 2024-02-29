import React, {useState} from "react";

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlay, faX} from "@fortawesome/free-solid-svg-icons";

interface FileChangeButtonProps {
    name: string;
    setCurrentFileByName: (name: string) => void;
    removeFile: (name: string) => void;
    currentFileName: string;
    isMain: boolean;
}

const FileChangeButton: React.FC<FileChangeButtonProps> = ({name, setCurrentFileByName, removeFile, currentFileName, isMain, renameFile}) => {
    const [newFileName, setNewFileName] = useState<string>(name);

    const [isRenaming, setIsRenaming] = useState<boolean>(false);

    const handleClick = event => {
        if (event.detail === 2) {
            setIsRenaming(true);
        }else if(event.detail === 1){
            setCurrentFileByName(name)
        }
    };

    const handleLoseFocus = () => {
        setIsRenaming(false);
        renameFile(name, newFileName);
        setNewFileName(name);
    }

    const changeFileName = (e) => {
        setNewFileName(e.currentTarget.value);
    }

    return (
        <div className={"flex justify-center items-center   text-sm cursor-pointer pr-2 "  + (currentFileName != name ? " bg-main-lighter-2 text-task-lighter" : " bg-terminal-color font-medium") } >
            <div className="flex items-center p-2.5  pl-4" onClick={handleClick} onBlur={handleLoseFocus}>
                {isMain ? <FontAwesomeIcon icon={faPlay} className="text-xs text-main-lighter"/> : "" }
                <div className="mx-6">
                    {isRenaming ?
                        <input value={newFileName} onChange={(e) => {changeFileName(e)}} className="bg-transparent   p-0 m-0 h-[100%]"></input>
                        : name
                    }
                </div>
            </div>

            <button className="text-task-lighter  p-1 pr-1.5 pl-1.5 rounded text-[0.6rem] hover:bg-red-700 hover:text-white" onClick={()=>removeFile(name)}><FontAwesomeIcon icon={faX} /></button>
        </div>

    );
};

export default FileChangeButton;