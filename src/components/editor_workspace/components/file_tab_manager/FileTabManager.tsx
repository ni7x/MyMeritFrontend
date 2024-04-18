import FileList from "./FileList";
import AddFileButton from "./AddFileButton";

const FileTabManager = ({files, currentFile, setCurrentFileByName, addFile, removeFile, getFileByName, renameFile, mainFileIndex}) => {
    return(
        <div className="flex items-center ">
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