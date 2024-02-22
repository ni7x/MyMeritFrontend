// import { excludeCookies } from "@utils/cookies";

export type TApiResponse<T> = {
    success: boolean;
    data: T[]; 
    message: string;
} 

type TApiMethod = "POST" | "GET" | "PUT" | "PATCH" | "DELETE"; 

type TRequiredBodyApiMethod = "POST" | "PUT" | "PATCH"; 

type TApiCallParams<T extends TApiMethod = TApiMethod> = {
    url: `/${string}`, 
    method: T, 
    body?: T extends TRequiredBodyApiMethod ? unknown : undefined; 
    config?: RequestInit
}

export async function apiCall<TData>({url, method, body, config}: TApiCallParams): Promise<TData> {
    const headers = {
        'Content-Type': 'application/json',
    }; 

    const response = await fetch(url, {
        method: method,
        headers,
        credentials: 'include', 
        body: JSON.stringify(body),
        ...config
    }); 
    
    const jsonResponse: TApiResponse<TData> = await response.json(); 

    if(jsonResponse.success)
    {
        return jsonResponse.data as TData;
    } else {
        const errorString: string = jsonResponse.message;
        throw new Error(errorString); 
    }
}