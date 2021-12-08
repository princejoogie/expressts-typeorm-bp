/* eslint-disable func-names */
import { response, Response } from "express";

response.customSuccess = function (
  statusCode: number,
  message: string,
  data: any = null
): Response {
  return this.status(statusCode).json({ message, data });
};
