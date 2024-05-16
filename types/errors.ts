export class IError extends Error {
  public message: string;
  public status?: number;
  stack?: string;
  constructor(e: unknown) {
    super();
    if (e instanceof Error) {
      this.message = e.message;
      this.stack = e.stack;
    } else {
      this.message = (e as IError).message;
    }
  }
  get stackTrace() {
    return this.stack;
  }
}
