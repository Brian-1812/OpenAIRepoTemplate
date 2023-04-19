import { CreateCompletionRequest, CreateCompletionResponse } from "openai";
import { openai } from "../middlewares/openai";
import backoff from "../utils/backoff";
import { AxiosError, AxiosResponse } from "axios";

export interface ResponseType {
  data?: AxiosResponse<CreateCompletionResponse, any>;
  error?: AxiosError;
}

const generate = async (
  prompt: string,
  options?: Partial<CreateCompletionRequest>
): Promise<ResponseType> => {
  try {
    const gptResponse = await openai.createCompletion({
      model: options?.model ?? "text-davinci-003",
      prompt,
      max_tokens: options?.max_tokens ?? 1000,
      temperature: options?.temperature ?? 0.5,
      best_of: options?.best_of ?? 1,
      n: options?.n ?? 1,
      user: options?.user,
      stream: options?.stream ?? false,
      stop: options?.stop,
    });
    return { data: gptResponse };
  } catch (err) {
    console.log("Error", (err as AxiosError)?.response?.data);
    console.log(err);
    return { data: undefined, error: err as AxiosError };
  }
};

const createCompletion = async (
  prompt: string,
  options?: Partial<CreateCompletionRequest>
) => {
  const response = await backoff(() => generate(prompt, options), 1);
  return response;
};

module.exports = createCompletion;
