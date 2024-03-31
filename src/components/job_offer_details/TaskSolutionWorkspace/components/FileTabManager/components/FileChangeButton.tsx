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

const FileChangeButton: React.FC<FileChangeButtonProps> = ({name, setCurrentFileByName, isMain, removeFile, currentFileName, renameFile}) => {
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

    const inputWidth = isRenaming ? `${newFileName.length }ch` : 'auto';

    return (
            <div className={"flex justify-center items-center text-sm cursor-pointer pr-3 border-r-[1px] border-main-bg-color "  + (currentFileName != name ? " bg-[#33343e] text-task-lighter " : (isRenaming ? " font-normal italic bg-terminal-color " : " bg-terminal-color font-medium"))  + (isMain ? " border-b-2 border-b-emerald-400 " : "" )} >
                <div
                    className="flex items-center p-1 py-2.5"
                    onClick={handleClick}
                    onBlur={handleLoseFocus}
                >
                    <div className="mx-4 truncate">
                        {isRenaming ?
                            <input
                                value={newFileName}
                                onChange={(e) => {changeFileName(e)}}
                                autoCorrect="false"
                                spellCheck="false"
                                className="bg-transparent p-0 m-0 h-[100%] outline-none font-[400] italic"
                                style={{ width: inputWidth }}

                            />
                            : name
                        }
                    </div>
                </div>

            <button
                className="text-task-lighter  p-1 pr-1.5 pl-1.5 rounded text-[0.6rem] hover:bg-red-700 hover:text-white"
                onClick={()=>removeFile(name)}
            >
                <FontAwesomeIcon icon={faX} /></button>
            </div>

    );
};

export default FileChangeButton;