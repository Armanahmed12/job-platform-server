class AppError extends Error {
  public statusCode: number;
  public errorCode: string | undefined;

  constructor(
    statusCode: number,
    message: string,
    errorCode?: string,
    stack = ''
  ) {
    super(message);

    this.statusCode = statusCode;
    this.errorCode = errorCode;

    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export default AppError;
