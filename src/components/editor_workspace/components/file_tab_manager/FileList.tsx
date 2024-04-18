import FileChangeButton from "./FileChangeButton";
import React from "react";
import MyFile from "../../../../models/MyFile";

interface FileListProps {
    files: MyFile[];
    setCurrentFileByName: (name: string) => void;
    currentFile: MyFile;
    removeFile: (name: string) => void;
}

const FileList: React.FC<FileListProps>= ({files, setCurrentFileByName, currentFile, removeFile, renameFile, mainFileIndex}) => {
    return(
        <div className="overflow-auto flex">
            {files.map(file =>
                <FileChangeButton
                    key={file.name}
                    name={file.name}
                    isMain={files[mainFileIndex].name == file.name}
                    setCurrentFileByName={setCurrentFileByName}
                    removeFile={removeFile}
                    renameFile={renameFile}
                    currentFileName={currentFile.name}
                />
            )}
        </div>
    )
}

export default FileList;