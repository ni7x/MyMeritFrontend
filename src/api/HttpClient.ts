export type HttpResponse<T> = {
  success: boolean;
  data: T[];
  message: string;
};

type HttpMethod = "POST" | "GET" | "PUT" | "PATCH" | "DELETE";

type RequiredBodyHttpMethod = "POST" | "PUT" | "PATCH";

type HttpCallParams<T extends HttpMethod = HttpMethod> = {
  url: `/${string}`;
  method: T;
  body?: T extends RequiredBodyHttpMethod ? unknown : undefined;
};

export async function httpCall<Data>({
  url,
  method,
  body,
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

  const jsonResponse: HttpResponse<Data> = await response.json();

  if (jsonResponse.success) {
    return jsonResponse.data as Data;
  } else {
    const errorString: string = jsonResponse.message;
    throw new Error(errorString);
  }
}
