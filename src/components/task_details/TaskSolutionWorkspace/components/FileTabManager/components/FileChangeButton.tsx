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
        <div className={"flex justify-center items-center pr-2 pl-4 p-2.5 text-sm "  + (currentFileName != name ? " bg-secondary-bg-color " : " bg-[#1e1e1e] ") }>
            {isMain ? <FontAwesomeIcon icon={faPlay} className="text-xs text-main-lighter"/> : "" }
            <div className="mx-6 w-[100%]" onClick={handleClick} onBlur={handleLoseFocus}>
                {isRenaming ?
                    <input value={newFileName} onChange={(e) => {changeFileName(e)}} className="bg-transparent w-[60px] resize-none"></input>
                    : name
                }
            </div>
            <button className="text-task-lighter  p-1 pr-1.5 pl-1.5 rounded text-[0.6rem] hover:bg-red-700 hover:text-white" onClick={()=>removeFile(name)}><FontAwesomeIcon icon={faX} /></button>
        </div>

    );
};

export default FileChangeButton;