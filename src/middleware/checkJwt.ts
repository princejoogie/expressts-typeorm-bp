import jwt from "jsonwebtoken";
import { CustomError } from "src/utils/response/customError";
import { IJwtPayload } from "src/types/JwtPayload";
import { NextFunction, Request, Response } from "express";
import { createJwtToken } from "src/utils/helpers";

export const checkJwt = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.get("Authorization");

  if (!authHeader) {
    const customError = new CustomError(
      400,
      "Unauthorized",
      "Authorization header not provided"
    );
    return next(customError);
  }

  const token = authHeader.split(" ")[1];
  let jwtPayload: { [key: string]: any };

  try {
    jwtPayload = jwt.verify(token, process.env.JWT_SECRET! as string) as {
      [key: string]: any;
    };
    ["iat", "exp"].forEach((key) => delete jwtPayload[key]);
    req.jwtPayload = jwtPayload as IJwtPayload;
  } catch (err: any) {
    const customError = new CustomError(401, "Unauthorized", "Invalid token");
    return next(customError);
  }

  try {
    const newToken = createJwtToken(jwtPayload as IJwtPayload);
    res.setHeader("Authorization", `Bearer ${newToken}`);
    return next();
  } catch (err: any) {
    const customError = new CustomError(
      500,
      "InternalServerError",
      "Error creating new token"
    );
    return next(customError);
  }
};
