import FileChangeButton from "./FileChangeButton";
import React from "react";
import File from "../../../../../../models/File";

interface FileListProps {
    files: File[];
    setCurrentFileByName: (name: string) => void;
    currentFile: File;
    removeFile: (name: string) => void;
}

const FileList: React.FC<FileListProps>= ({files, setCurrentFileByName, currentFile, removeFile, renameFile}) => {
    return(
        <>
            {files.map(file =>
                <FileChangeButton
                    key={file.name}
                    name={file.name}
                    isMain={file.isMain}
                    setCurrentFileByName={setCurrentFileByName}
                    removeFile={removeFile}
                    renameFile={renameFile}
                    currentFileName={currentFile.name}
                />
            )}
        </>
    )
}

export default FileList;