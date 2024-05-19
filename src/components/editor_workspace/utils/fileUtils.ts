import MyFile from "../../../models/MyFile";
import JSZip from "jszip";
import languagesData from "./extension-scripts-map.json";
import extensionToLanguage from "./language-extension-map.json";

interface Script {
    name: string;
    content: string;
}

export const getFileExtension = (fileName: string): string => {
    const parts = fileName.split(".");
    return parts.length > 1 ? parts[parts.length - 1] : "plaintext";
};

const getFileNameWithoutExtension = (fileName: string): string => {
    const lastDotIndex = fileName.lastIndexOf(".");
    return lastDotIndex !== -1 ? fileName.substring(0, lastDotIndex) : fileName;
};

const getLanguageFromFileExtension = (fileExtension: string) : string =>{
    const language = extensionToLanguage[fileExtension];
    if(language == "c++"){
        return "cpp";
    }if(fileExtension == "h"){
        return "cpp";
    }
    return language ? language.toLowerCase() : fileExtension;
}


export const getLanguageFromFileName = (fileName: string) : string => {
    return getLanguageFromFileExtension(getFileExtension(fileName));
}

export const decodeBase64 = (base64) => { //uzywanie samego atob nie konwerowalo wszystkich znakow specialnych ascii
    const text = atob(base64);
    const length = text.length;
    const bytes = new Uint8Array(length);
    for (let i = 0; i < length; i++) {
        bytes[i] = text.charCodeAt(i);
    }
    const decoder = new TextDecoder();
    return decoder.decode(bytes);
}


export const fileToBase64 = (file: File): Promise<string> => {
    return new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            const base64String = reader.result?.toString() || '';
            const base64Data = base64String.split(',')[1]; // Get the part after the comma
            resolve(base64Data);
        };
        reader.onerror = error => reject(error);
    });
};



export enum ContentType {
    BMP = 'image/bmp',
    CSV = 'text/csv',
    ODT = 'application/vnd.oasis.opendocument.text',
    DOC = 'application/msword',
    DOCX = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    GIF = 'image/gif',
    HTM = 'text/htm',
    HTML = 'text/html',
    JPG = 'image/jpg',
    JPEG = 'image/jpeg',
    PDF = 'application/pdf',
    PNG = 'image/png',
    PPT = 'application/vnd.ms-powerpoint',
    PPTX = 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
    TIFF = 'image/tiff',
    TXT = 'text/plain',
    XLS = 'application/vnd.ms-excel',
    XLSX = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    MP4 = 'video/mp4'
}

export const getContentType = (fileName: string): ContentType => {
    const fileExtension = getFileExtension(fileName).toLowerCase();
    const contentType = ContentType[fileExtension.toUpperCase() as keyof typeof ContentType];
    return contentType || ContentType.TXT;
};

const generateScriptsContent = (languages, mainFileName) : Script[] => {
    const fileExtension = getFileExtension(mainFileName)
    const language = languagesData[fileExtension];

    if (!language) {
        throw new Error(`Language not found for file extension: ${fileExtension}`);
    }

    const {compile, run, source_file} = language;

    if (!compile && !run) {
        console.error(`Compile and run command not defined for language: ${source_file}`);
        return [];
    }

    const compileScriptContent = compile?.replace(source_file, " *." + fileExtension).replace(" %s ", "") ;
    const runScriptContent = run?.replace(getFileNameWithoutExtension(source_file), getFileNameWithoutExtension(mainFileName));

    return [
        { name: "compile", content: compileScriptContent },
        { name: "run", content: runScriptContent }
    ];
}

export const generateEncodedZip = (files: MyFile[], mainFile: MyFile): Promise<string> => {
    files = files.filter(f=>f.type === ContentType.TXT);
    console.log(files)
    return new Promise((resolve, reject) => {
        const mainFileName = mainFile.name;
        if(!mainFileName){
            reject(new Error("No main file"));
        }
        const language = getLanguageFromFileName(mainFileName);

        const zip = new JSZip();

        files.forEach(file => {
            zip.file(file.name, atob(file.contentBase64));
        });

        generateScriptsContent(language, mainFileName).forEach((script) => {
            zip.file(script.name, script.content);
        });

        zip.generateAsync({ type: "blob" }).then(content => {
            const reader = new FileReader();
            reader.onload = () => {
                if (typeof reader.result === "string") {
                    resolve(reader.result.split(',')[1]);
                } else {
                    reject(new Error("Encoding problem"));
                }
            };
            reader.onerror = (error) => {
                reject("Reader problem ", error);
            };
            reader.readAsDataURL(content);
        }).catch(error => {
            reject(error);
        });
    });
};


