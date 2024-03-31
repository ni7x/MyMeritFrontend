import MyFile from "../../../../models/MyFile";
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



export const getContentType = (fileName) => {
    const fileExtension = getFileExtension(fileName);
    //z https://www.npmjs.com/package/@cyntler/react-doc-viewer
    const mimeTypes = {
        bmp: 'image/bmp',
        csv: 'text/csv',
        odt: 'application/vnd.oasis.opendocument.text',
        doc: 'application/msword',
        docx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        gif: 'image/gif',
        htm: 'text/htm',
        html: 'text/html',
        jpg: 'image/jpg',
        jpeg: 'image/jpeg',
        pdf: 'application/pdf',
        png: 'image/png',
        ppt: 'application/vnd.ms-powerpoint',
        pptx: 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
        tiff: 'image/tiff',
        txt: 'text/plain',
        xls: 'application/vnd.ms-excel',
        xlsx: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        mp4: 'video/mp4'
    };

    const extension = fileExtension.toLowerCase();
    return mimeTypes[extension] || 'text/plain';
}


const generateScriptsContent = (languages, mainFileName) : Script[] => {
    const fileExtension = getFileExtension(mainFileName)
    console.log(fileExtension)
    const language = languagesData[fileExtension];

    if (!language) {
        console.error(`Language not found for file extension: ${fileExtension}`);
    }

    const { compile, run, source_file } = language;

    if (!compile && !run) {
        console.error(`Compile and run command not defined for language: ${source_file}`);
        return [];
    }

    const compileScriptContent = compile?.replace(source_file, " *." + fileExtension).replace(" %s ", "") ;
    const runScriptContent = run?.replace(getFileNameWithoutExtension(source_file), getFileNameWithoutExtension(mainFileName));
    console.log(compileScriptContent)
    console.log(runScriptContent)

    return [
        { name: "compile", content: compileScriptContent },
        { name: "run", content: runScriptContent }
    ];
}

export const generateEncodedZip = (files: MyFile[]): Promise<string> => {
    files = files.filter(f=>f.type === "text/plain");
    console.log(files)
    return new Promise((resolve, reject) => {
        const mainFileName = files[0].name;
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


