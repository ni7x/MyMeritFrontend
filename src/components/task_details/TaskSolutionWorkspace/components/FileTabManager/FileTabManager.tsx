import FileList from "./components/FileList";
import AddFileButton from "./components/AddFileButton";

const FileTabManager = ({files, currentFile, setCurrentFileByName, addFile, removeFile, getFileByName, renameFile}) => {
    return(
        <div className="flex items-center">
            <FileList
                files={files}
                currentFile={currentFile}
                setCurrentFileByName={setCurrentFileByName}
                removeFile={removeFile}
                renameFile={renameFile}
            />
            <AddFileButton addFile={addFile} getFileByName={getFileByName}/>

        </div>
    )
}

export default FileTabManager;