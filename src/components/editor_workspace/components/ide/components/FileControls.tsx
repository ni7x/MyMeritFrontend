import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownLeftAndUpRightToCenter, faUpRightAndDownLeftFromCenter, faShield } from '@fortawesome/free-solid-svg-icons';
import {ContentType} from "../../../utils/fileUtils";

const FileControls = ({ currentFile, currentFileIndex, mainFileIndex, setIsMaxSize, setAsMain, isMaxSize }) => {
    return (
        <div className="relative">
            <button
                className="hidden lg:block absolute bg-task-bck top-[-2.5rem] left-[calc(100%-2.5rem)]  p-2 rounded shadow-md hover:bg-main-lighter-2"
                onClick={() => setIsMaxSize(!isMaxSize)}
            >
                <FontAwesomeIcon
                    icon={isMaxSize ? faDownLeftAndUpRightToCenter : faUpRightAndDownLeftFromCenter}
                />
            </button>
            {currentFile.type === ContentType.TXT &&
                <button
                    disabled={currentFileIndex === mainFileIndex}
                    className={"absolute left-[calc(100%-2.5rem)] bg-task-bck top-[-2.5rem] lg:left-[calc(100%-5rem)] p-2 rounded shadow-md hover:bg-main-lighter-2 " + (currentFileIndex === mainFileIndex ? " text-emerald-400" : "")}
                    onClick={() => setAsMain(currentFile.name)}
                >
                    <FontAwesomeIcon
                        icon={faShield}
                    />
                </button>
            }
        </div>
    );
};

export default FileControls;
