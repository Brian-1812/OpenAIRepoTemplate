import { ResponseType } from "../controllers/createCompletion";
import { delay } from "./delay";

const backoff = async <T extends ResponseType>(
  fun: () => Promise<T>,
  exponent: number
): Promise<{ success: boolean; data: any }> => {
  console.log("Retrying after " + Math.pow(2, exponent) + "s");
  const seconds = (Math.pow(2, exponent) + Math.random()) * 1000;
  await delay(seconds);
  const res = await fun();
  if (res.data) {
    console.log("success");
    return { success: true, data: res.data };
  } else if (exponent <= 10) {
    return await backoff(fun, exponent + 1);
  } else {
    console.log("failure");
    return { success: false, data: res.error };
  }
};

export default backoff;
