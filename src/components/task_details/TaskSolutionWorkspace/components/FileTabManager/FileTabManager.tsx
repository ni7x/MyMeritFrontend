import FileList from "./components/FileList";
import AddFileButton from "./components/AddFileButton";

const FileTabManager = ({files, currentFile, setCurrentFileByName, addFile}) => {
    return(
        <div className="top-panel">
            <FileList
                files={files}
                currentFile={currentFile}
                setCurrentFileByName={setCurrentFileByName}
            />
            <AddFileButton addFile={addFile} />
        </div>
    )
}

export default FileTabManager;