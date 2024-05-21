import { IMessage, IResponse } from "@/types/http";
import { IError } from "@/types/errors";

export const dummyMutationSuccess = async (): Promise<IResponse<IMessage>> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ data: { message: "success" }, error: null, status: 200 });
    }, 3000);
  });
};
export const dummyMutationError = async (): Promise<IResponse<IMessage>> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const res: IResponse<IMessage> = {
        data: { message: "" },
        error: new IError({ message: "" }),
        status: 400,
      };
      return resolve(res);
    }, 3000);
  });
};
