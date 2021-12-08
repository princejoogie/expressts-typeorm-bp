import { IJwtPayload } from "../JwtPayload";

export declare global {
  export namespace Express {
    export interface Request {
      jwtPayload: IJwtPayload;
    }
    // export interface Response {
    //   customSuccess(httpStatusCode: number, message: string, data?: any): Response;
    // }
  }
}
