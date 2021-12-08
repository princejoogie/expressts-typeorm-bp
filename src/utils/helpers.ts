import jwt from "jsonwebtoken";
import { IJwtPayload } from "src/types/JwtPayload";

export const createJwtToken = (payload: IJwtPayload) => {
  return jwt.sign(payload, process.env.JWT_SECRET!, {
    expiresIn: process.env.JWT_EXPIRATION!,
  });
};
