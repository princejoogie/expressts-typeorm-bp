/* eslint-disable no-unused-vars */
import { IJwtPayload } from "../JwtPayload";

declare global {
  namespace Express {
    export interface Request {
      jwtPayload: IJwtPayload;
    }
    export interface Response {
      customSuccess(httpStatusCode: number, data?: any): Response;
    }
  }
}
