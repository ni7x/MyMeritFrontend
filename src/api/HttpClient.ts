import Cookies from "universal-cookie";

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

  const response = await fetch(url, {
    method: method,
    headers,
    credentials: "include",
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    throw new Error("Error");
  }

  return await response.json();
}
