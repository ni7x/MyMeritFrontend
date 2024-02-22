import FileChangeButton from "./FileChangeButton";
import React from "react";

interface FileListProps {
    files: File[];
    setCurrentFileByName: (name: string) => void;
    currentFile: File;
}

const FileList: React.FC<FileListProps>= ({files, setCurrentFileByName, currentFile}) => {
    return(
        <>
        {files.map(file =>
                <FileChangeButton
                    key={file.name}
                    name={file.name}
                    setCurrentFileByName={setCurrentFileByName}
                    currentFileName={currentFile.name}
                />
            )}
        </>
    )
}

export default FileList;