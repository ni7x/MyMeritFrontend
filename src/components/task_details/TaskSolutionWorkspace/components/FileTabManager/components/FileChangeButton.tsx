import React from "react";

interface FileChangeButtonProps {
    name: string;
    setCurrentFileByName: (name: string) => void;
    currentFileName: string;
}

const FileChangeButton: React.FC<FileChangeButtonProps> = ({name, setCurrentFileByName, currentFileName}) => {
    return (
       <button className="file-change-button" disabled={currentFileName === name} onClick={() => setCurrentFileByName(name)}>
           {name}
       </button>
    );
};

export default FileChangeButton;