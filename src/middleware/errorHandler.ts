/* eslint-disable no-unused-vars */
import { NextFunction, Request, Response } from "express";
import { CustomError } from "src/utils/response/customError";

export const errorHandler = (
  err: CustomError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof CustomError) {
    return res.status(err.StatusCode).json(err.JSON);
  }

  const customError = new CustomError(
    500,
    "InternalServerError",
    "Something went wrong"
  );
  return res.status(customError.StatusCode).json(customError.JSON);
};
