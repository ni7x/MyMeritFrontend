import React from "react";

const FileChangeButton: React.FC = ({name, setCurrentFileByName, currentFileName}) => {
    return (
       <button className="file-change-button" disabled={currentFileName === name} onClick={() => setCurrentFileByName(name)}>
           {name}
       </button>
    );
};

export default FileChangeButton;