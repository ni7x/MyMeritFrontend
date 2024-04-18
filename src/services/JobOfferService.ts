import TaskPreview from "../models/TaskPreview";
import {QueryParams} from "../models/QueryParams";
import MyFile from "../models/MyFile";
import {buildURL} from "../components/home_job_offers/URLHelper";
import {ContentType, generateEncodedZip} from "../components/editor_workspace/utils/fileUtils";
import {errorToast} from "../main";
import CodeExecutionOutput from "../models/CodeExecutionOutput";

const getHomeJobOffers = async (params: QueryParams) : Promise<Response> => {
    const URL = import.meta.env.VITE_API_URL + buildURL(params);
    try {
        return await fetch(URL, {
            method: 'GET',
        });
    } catch (error) {
        console.error('Error:', error);
    }
};


const getUserTasks = (userId: string): TaskPreview[] => {
    return [];
}

const getJobOfferById = async (jobOfferId: string, token: string): Promise<Response> => {
    const URL = import.meta.env.VITE_API_URL+ "/job/" + jobOfferId;
    try {
        return await fetch(URL, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
        });
    } catch (error) {
        console.error('Error:', error);
    }
}

export const getTestToken = async (files: MyFile[], testFileContent: string, taskId: string) => {
    try {
        const testFile = new MyFile("testmain.cpp", ContentType.TXT ,testFileContent)
        const filesToCompile = [...files, testFile]

        let fileContentBase64;
        try {
            fileContentBase64 = await generateEncodedZip(filesToCompile, testFile);
        } catch (zipError) {
            errorToast("Main file is not compilable");
            return null;
        }

        const response = await fetch("http://localhost:8080/test/task/" + taskId, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                fileName: "testmain.cpp",
                fileContentBase64: fileContentBase64,
            })
        });

        if (!response.ok) {
            console.log(response)
            errorToast("Error fetching token");
            return null;
        }

        return await response.text();
    } catch (error) {
        errorToast("Error fetching token");
        return null;
    }
};

export const getToken = async (userInput: string, files: MyFile[], mainFileIndex: number, file: MyFile, timeLimit: number, memoryLimit: number) => {
    try {
        const stdin = userInput && userInput.trim().length > 0 ? btoa(userInput) : null;
        let fileContentBase64;
        try {
            fileContentBase64 = await generateEncodedZip(files, files[mainFileIndex]);
        } catch (zipError) {
            errorToast("Main file is not compilable");
            return null;
        }

        const response = await fetch("http://localhost:8080/token", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                fileName: file.name,
                fileContentBase64: fileContentBase64,
                stdin: stdin,
                timeLimit: timeLimit,
                memoryLimit: memoryLimit
            })
        });

        if (!response.ok) {
            errorToast("Error fetching token");
            return null;
        }

        return await response.text();
    } catch (error) {
        errorToast("Error fetching token");
        return null;
    }
};

export const getCompilation = async (token: string) => {
    try {
        const response = await fetch("http://localhost:8080/token/" + token, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        });

        if (!response.ok) {
            errorToast("Compilation problem");
            return null;
        }

        return await response.json() as CodeExecutionOutput;
    } catch (error) {
        errorToast("Compilation problem");
        return null;
    }
};


const b64toBlob = (base64, type = 'application/octet-stream') =>
    fetch(`data:${type};base64,${base64}`).then(res => res.blob())

const submitSolution = async (jobId: string, files: MyFile[], token: string) => {
    const URL = import.meta.env.VITE_API_URL + "/job/solution/" + jobId;
    const data = new FormData();

    for (const file of files) {
        const fileBlob = await b64toBlob(file.contentBase64, file.type);
        const fileObject = new File([fileBlob], file.name, {type: file.type});
        data.append("files", fileObject);
    }
    try {
        return await fetch(URL, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
            body: data
        });
    } catch (error) {
        console.error('Error:', error);
    }
}

const submitFeedback = async (solutionId: string, files: MyFile[], credits: number, token: string) => {
    const URL = import.meta.env.VITE_API_URL + "/solution/" + solutionId;
    const data = new FormData();
    for (const file of files) {
        const fileBlob = await b64toBlob(file.contentBase64, file.type);
        const fileObject = new File([fileBlob], file.name, {type: file.type});
        data.append("files", fileObject);
    }
    data.append("credits", credits.toString());
    try {
        return await fetch(URL, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
            body: data
        });
    } catch (error) {
        console.error('Error:', error);
    }
}


const downloadFiles = async (jobId: string, token: string): Promise<Response> => {
    const URL = import.meta.env.VITE_API_URL+ "/job/solutions/" + jobId;
    try {
        return await fetch(URL, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
        });
    } catch (error) {
        console.error('Error:', error);
    }
}

const downloadSolutionFiles = async (solutionId: string, token: string): Promise<Response> => {
    const URL = import.meta.env.VITE_API_URL+ "/solution/" + solutionId;
    try {
        return await fetch(URL, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
        });
    } catch (error) {
        console.error('Error:', error);
    }
}

export  { getUserTasks, getJobOfferById, getHomeJobOffers, submitSolution, downloadFiles, downloadSolutionFiles, submitFeedback }
