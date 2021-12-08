/* eslint-disable func-names */
import { response, Response } from "express";

response.customSuccess = function (
  statusCode: number,
  data: any = null
): Response {
  return this.status(statusCode).json(data);
};
