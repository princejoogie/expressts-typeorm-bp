import { NextFunction, Request, Response } from "express";
import { IJwtPayload } from "src/types/JwtPayload";
import { createJwtToken } from "src/utils/helpers";
import jwt from "jsonwebtoken";

export const checkJwt = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.get("Authorization");

  if (!authHeader) {
    return res
      .status(400)
      .send({ message: "Authorization header not provided" });
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
    return res.status(401).send({
      type: "UNAUTHORIZED",
      message: "Invalid token",
    });
  }

  try {
    const newToken = createJwtToken(jwtPayload as IJwtPayload);
    res.setHeader("Authorization", `Bearer ${newToken}`);
    return next();
  } catch (err: any) {
    return res.status(401).send({
      type: "RAW",
      message: "Token can not be created",
    });
  }
};
