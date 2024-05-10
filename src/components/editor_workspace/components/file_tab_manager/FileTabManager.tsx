import FileList from "./FileList";
import AddFileButton from "./AddFileButton";
import MyFile from "../../../../models/MyFile.ts";
import React from "react";

interface Props {
    files: MyFile[];
    currentFile: MyFile;
    setCurrentFileByName: (name: string) => void;
    addFile: (name: string, content?: string) => void;
    removeFile: (name: string) => void;
    getFileByName: (name: string) => MyFile | undefined;
    renameFile: (oldName: string, newName: string) => void;
    mainFileIndex: number;
}

const FileTabManager: React.FC<Props>= ({files, currentFile, setCurrentFileByName, addFile, removeFile, getFileByName, renameFile, mainFileIndex}) => {
    return(
        <div className="flex items-center overflow-auto">
            <FileList
                files={files}
                currentFile={currentFile}
                setCurrentFileByName={setCurrentFileByName}
                removeFile={removeFile}
                renameFile={renameFile}
                mainFileIndex={mainFileIndex}
            />
            <AddFileButton addFile={addFile} getFileByName={getFileByName}/>

        </div>
    )
}

export default FileTabManager;