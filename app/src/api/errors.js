// app/src/api/errors.js

export const ErrorType = {
  NETWORK_FAILURE: "network_failure",
  UNAUTHORIZED_ACCESS: "unauthorized_access",
  INVALID_INPUT: "invalid_input",
  SERVER_ERROR: "server_error",
};

export const errorMessages = {
  [ErrorType.NETWORK_FAILURE]: "Network unavailable",
  [ErrorType.UNAUTHORIZED_ACCESS]: "Access denied",
  [ErrorType.INVALID_INPUT]: "Please check your input data",
  [ErrorType.SERVER_ERROR]: "Unexpected error occurred",
};

export class AppError extends Error {
  constructor(type, message) {
    super(message);
    this.name = "AppError";
    this.type = type;
  }
}

export function mapHttpStatusToErrorType(status) {
  if (status === 400) return ErrorType.INVALID_INPUT;
  if (status === 401 || status === 403) return ErrorType.UNAUTHORIZED_ACCESS;
  return ErrorType.SERVER_ERROR;
}
