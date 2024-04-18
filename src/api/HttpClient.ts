import {errorToast} from "../main";

export type HttpResponse<T> = {
  success: boolean;
  data: T[];
  message: string;
};

type HttpMethod = "POST" | "GET" | "PUT" | "PATCH" | "DELETE";

type RequiredBodyHttpMethod = "POST" | "PUT" | "PATCH";

type HttpCallParams<T extends HttpMethod = HttpMethod> = {
  url: string;
  method: T;
  body?: T extends RequiredBodyHttpMethod ? unknown : undefined;
};
type HttpCallWithAuthorizationParams<T extends HttpMethod = HttpMethod> = {
  url: string;
  method: T;
  body?: T extends RequiredBodyHttpMethod ? unknown : undefined;
  token?: string;
};

export async function httpCall<Data>({
  url,
  method,
  body, //token
}: HttpCallParams): Promise<Data> {
  const headers = {
    "Content-Type": "application/json",
  };

  const response = await fetch(url, {
    method: method,
    headers,
    credentials: "include",
    body: JSON.stringify(body),
  });

  return await response.json();
}

export async function httpCallWithAuthorization<Data>({
                                       token,
                                       url,
                                       method,
                                       body,

                                     }: HttpCallWithAuthorizationParams): Promise<Data> {
  const headers = {
    "Content-Type": "application/json",
    "Authorization" : `Bearer ${token}`
  };

  const response = await fetch(url, {
    method: method,
    headers,
    credentials: "include",
    body: JSON.stringify(body),
  });

  if(!response.ok){
    errorToast(response.status)
    return;
  }

  return await response.json();
}

