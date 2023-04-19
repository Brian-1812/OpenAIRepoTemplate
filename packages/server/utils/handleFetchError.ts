export class HTTPResponseError extends Error {
  response: Response;
  constructor(response: Response, msg: string) {
    super(
      `HTTP Error Response: ${response.status} ${msg ?? response.statusText}`
    );
    this.response = response;
  }
}

export const checkStatus = async (response: Response) => {
  if (response.ok) {
    // response.status >= 200 && response.status < 300
    return response;
  } else {
    const msg = (await response.json())?.message;
    throw new HTTPResponseError(response, msg);
  }
};
