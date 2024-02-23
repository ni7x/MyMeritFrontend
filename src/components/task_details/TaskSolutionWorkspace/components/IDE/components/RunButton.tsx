import React from "react";
import File from "../../../../../../models/File";
import {isRunnable} from "../../../fileUtils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {  faPlay   } from '@fortawesome/free-solid-svg-icons';

const RunButton: React.FC<{file:File, setCodeOutput: (output: string) => void;}> = ({file, setCodeOutput}) => {


    const compileCode = () => {
        setCodeOutput("[main.cpp:3:] warning: unused variable 'x'\n");
    }

    return (
        <button className="bg-black border-[2px] border-emerald-500 text-emerald-400 p-1.5 px-5 text-sm font-semibold rounded mr-4"  onClick={compileCode}>
           Run
        </button>
    );
};

export default RunButton;