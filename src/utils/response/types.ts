export type ErrorType =
  | "General"
  | "Raw"
  | "Validation"
  | "Unauthorized"
  | "Forbidden"
  | "NotFound"
  | "Conflict"
  | "NotAcceptable"
  | "Unprocessable"
  | "InternalServerError"
  | "NotImplemented"
  | "BadGateway"
  | "ServiceUnavailable"
  | "GatewayTimeout"
  | "HttpVersionNotSupported";

export type ErrorValidation = { [key: string]: string };

export type ErrorResponse = {
  type: ErrorType;
  message: string;
  errors: string[] | null;
  errorRaw: any;
  errorsValidation: ErrorValidation[] | null;
  stack?: string;
};
