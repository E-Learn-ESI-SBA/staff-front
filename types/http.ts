import { IError } from "@/types/errors";

export interface IResponse<T> {
  status: number;
  data: T;
  error: IError | null;
}
