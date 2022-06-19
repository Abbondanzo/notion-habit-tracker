const LOCAL = true;
const BASE_URL = LOCAL ? "http://localhost:4000/api" : "/api";

type JSON = { [key: string]: any } | string | number | null;

const doSend =
  (method: "GET" | "DELETE" | "POST" | "PUT" | "PATCH") =>
  async <T extends JSON>(
    destination: string,
    body?: BodyInit,
    headers: HeadersInit = {}
  ): Promise<T> => {
    headers = {
      Accept: "application/json",
      "Content-Type": "application/json",
      authorization: process.env.REACT_APP_NOTION_API_KEY!,
      ...headers,
    };

    const url = `${BASE_URL}${destination}`;

    return fetch(url, { method, body, headers }).then((res) =>
      handleResponse<T>(res)
    );
    // .catch((err) => handleError(err, url, method))
  };

const doGet = doSend("GET");
const doDelete = doSend("DELETE");
const doPost = doSend("POST");
const doPut = doSend("PUT");
const doPatch = doSend("PATCH");

const handleResponse = async <T>(response: Response): Promise<T> => {
  if (!response.ok) {
    const text = await response.text();
    throw new Error(text);
  }
  return response.json();
};

// const handleError = (error: AxiosError, url: string, method: string) => {
//   reportError(error, {
//     name: error.name,
//     message: error.message,
//     request: error.request,
//     response: error.response,
//     url,
//     method,
//   })
//   if (error.response) {
//     const code = error.response.status
//     const message = error.response.data || error.message
//     throw { code, message } as ApiError
//   }
//   throw error
// }

export const api = {
  get: doGet,
  post: doPost,
  put: doPut,
  patch: doPatch,
  delete: doDelete,
};
