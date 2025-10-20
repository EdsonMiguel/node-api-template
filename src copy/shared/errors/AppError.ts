enum ErrorCodes {
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  NOT_FOUND = 404,
  CONFLICT = 409,
  INTERNAL_SERVER_ERROR = 500,
}

class AppError {
  public readonly message: string;
  public readonly statusCode: number;

  constructor(
    message: string,
    statusCode: ErrorCodes = ErrorCodes.BAD_REQUEST
  ) {
    this.message = message;
    this.statusCode = statusCode || ErrorCodes.BAD_REQUEST;
  }
}
export default AppError;
