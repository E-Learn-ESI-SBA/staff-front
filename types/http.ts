export interface IResponse<T> {
  status: number;
  data: T;
  error: Error;
}
