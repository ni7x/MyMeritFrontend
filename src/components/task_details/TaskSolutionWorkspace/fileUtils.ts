import File from "../../../models/File";

const getFileExtension = (fileName: string): string => {
    const parts = fileName.split(".");
    return parts.length > 1 ? parts[parts.length - 1] : "plaintext";
};

const getLanguageFromFileExtension = (fileExtension: string) : string =>{
    switch (fileExtension){
        case "js":
            return "javascript";
        case "cpp":
            return "cpp";
        case "java":
            return "java";
        default:
            return "plaintext"
    }
}


export const getLanguageFromFileName = (fileName: string) : string => {
    return getLanguageFromFileExtension(getFileExtension(fileName));
}

export const isRunnable = (file:File) : boolean => {
    switch (file.language) {
        case "javascript":
        case "java":
            return true;

        default:
            return false;
    }
}