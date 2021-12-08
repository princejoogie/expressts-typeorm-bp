import { NextFunction, Request, Response } from "express";
import { getRepository } from "typeorm";
import { User } from "src/orm/entities/User";
import { registerDto } from "src/middleware/validators/schema/auth.schema";
import { CustomError } from "src/utils/response/customError";
import { createJwtToken } from "src/utils/helpers";
import { IJwtPayload } from "src/types/JwtPayload";
import { Role } from "src/orm/entities/types";

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, firstName, lastName, password } =
    req.body as registerDto["body"];
  const userRepository = getRepository(User);

  try {
    const tempUser = await userRepository.findOne({ where: { email } });

    if (tempUser) {
      const customError = new CustomError(
        400,
        "NotAcceptable",
        "User already exists"
      );
      return next(customError);
    }

    const newUser = userRepository.create({
      email,
      firstName,
      lastName,
      password,
    });
    newUser.hashPassword();
    await userRepository.save(newUser);

    const payload: IJwtPayload = {
      id: newUser.id,
      email: newUser.email,
      role: newUser.role as Role,
      tokenVersion: newUser.tokenVersion,
    };

    try {
      const user = {
        id: newUser.id,
        email: newUser.email,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
      };
      const token = createJwtToken(payload);
      return res.customSuccess(200, { user, token });
    } catch (err) {
      const customError = new CustomError(
        400,
        "Unprocessable",
        "Token cannot be created",
        null,
        err
      );
      return next(customError);
    }
  } catch (err: any) {
    return res.status(400).json({
      type: err.name,
      message: err.message,
    });
  }
};
