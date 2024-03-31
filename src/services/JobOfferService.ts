import TaskPreview from "../models/TaskPreview";
import {QueryParams} from "../models/QueryParams";
import MyFile from "../models/MyFile";
import {buildURL} from "../components/home_job_offers/URLHelper";

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

const b64toBlob = (base64, type = 'application/octet-stream') =>
    fetch(`data:${type};base64,${base64}`).then(res => res.blob())

const submitSolution = async (jobId: string, files: MyFile[], token: string) => {
    const URL = import.meta.env.VITE_API_URL + "/job/solution/" + jobId;

    const data = new FormData();
    for (const file of files) {
        const fileBlob = await b64toBlob(file.contentBase64, file.type);


        console.log(fileBlob)
        const fileObject = new File([fileBlob], file.name, {type: file.type});
        console.log(fileObject)

        data.append("files", fileObject);
    }

    // Log FormData entries
    for (const entry of data.entries()) {
        console.log(entry[0], entry[1]);
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





export  { getUserTasks, getJobOfferById, getHomeJobOffers, submitSolution, downloadFiles }
