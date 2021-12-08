import { ErrorResponse, ErrorType, ErrorValidation } from "./types";

export class CustomError extends Error {
  private statusCode: number;

  private errorType: ErrorType;

  private errors: string[] | null;

  private errorRaw: any;

  private errorsValidation: ErrorValidation[] | null;

  constructor(
    statusCode: number,
    errorType: ErrorType,
    message: string,
    errors: string[] | null = null,
    errorRaw: any = null,
    errorsValidation: ErrorValidation[] | null = null
  ) {
    super(message);
    this.name = this.constructor.name;
    this.statusCode = statusCode;
    this.errorType = errorType;
    this.errors = errors;
    this.errorRaw = errorRaw;
    this.errorsValidation = errorsValidation;
  }

  get StatusCode() {
    return this.statusCode;
  }

  get JSON(): ErrorResponse {
    return {
      type: this.errorType,
      message: this.message,
      errors: this.errors,
      errorRaw: this.errorRaw,
      errorsValidation: this.errorsValidation,
      stack: this.stack,
    };
  }
}
