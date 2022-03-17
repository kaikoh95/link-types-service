interface ApiErrorProps extends Error {
  statusCode?: number;
  code?: number;
  status: number;
}

export class ApiError extends Error {
  public status: number = 500;

  public name: string = 'ApiError';

  public message: string = 'APIError';

  public stack: string;

  constructor(message?: string, options: {name?: string, status?: number, stack?: string} = {}) {
    super();
    const { name, status, stack } = options;
    if (status) {
      this.status = status;
    }
    if (name) {
      this.name = name;
    }
    if (message != null) {
      this.message = message;
    }
    if (process.env.APP_ENV !== 'production') {
      this.stack = stack;
    }
  }

  static TooManyRequests(message: string = 'Too many requests!') {
    return new ApiError(message, { name: 'TOO_MANY_REQUESTS', status: 429 });
  }

  static BadRequest(message: string = 'Bad Request') {
    return new ApiError(message, { name: 'BAD_REQUEST', status: 400 });
  }

  static UserNotAllowed(message: string = 'User Not Allowed') {
    return new ApiError(message, { name: 'USER_NOT_ALLOWED', status: 403 });
  }

  static Unauthorized(message: string = 'Unauthorized Access') {
    return new ApiError(message, { name: 'UNAUTHORIZED', status: 401 });
  }

  static fromError(err: ApiErrorProps, name?: string, status?: number, message?: string) {
    const errMessage = message || err.message || 'Unknown Error';
    const errName = name || err.name;
    const errStatus = status || err.code || err.statusCode || err.status || 500;
    return new ApiError(errMessage, { name: errName, status: Number(errStatus), stack: err.stack });
  }
}
