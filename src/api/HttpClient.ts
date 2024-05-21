import { errorToast } from "../main";
import Cookies from "universal-cookie";

export type HttpResponse<T> = {
  success: boolean;
  data: T;
  message: string;
};

type HttpMethod = "POST" | "GET" | "PUT" | "PATCH" | "DELETE";

type RequiredBodyHttpMethod = "POST" | "PUT" | "PATCH";

type HttpCallParams<T extends HttpMethod = HttpMethod> = {
  url: string;
  method: HttpMethod;
  body?: T extends RequiredBodyHttpMethod ? unknown : undefined;
};
type HttpCallWithAuthorizationParams<T extends HttpMethod = HttpMethod> = {
  url: string;
  method: T;
  body?: T extends RequiredBodyHttpMethod ? unknown : undefined;
  token?: string;
};

export async function httpCall<HttpResponse>({
  url,
  method,
  body,
}: HttpCallParams): Promise<HttpResponse> {
  const cookies = new Cookies();
  const user = cookies.get("user");
  const accessToken = user?.accessToken;

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${accessToken}`,
  };

  try{
    const response = await fetch(url, {
      method: method,
      headers,
      credentials: "include",
      body: JSON.stringify(body),
    });
  
    if (response.status >= 500) {
      errorToast("Server error. Please try again later.");
      return {} as HttpResponse;
    }
  
    return await response.json();
  } catch (e) {
    errorToast("Server error. Please try again later.");
    return {} as HttpResponse;
  }

}

export async function httpCallWithAuthorization<Data>({
  token,
  url,
  method,
  body,
}: HttpCallWithAuthorizationParams): Promise<Data> {
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };

  const response = await fetch(url, {
    method: method,
    headers,
    credentials: "include",
    body: JSON.stringify(body),
  });

  if (response.status >= 500) {
    errorToast("Server error. Please try again later.");
    return {} as Data;
  }

  return await response.json();
}
